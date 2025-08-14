import { Controller, Get, Post, Body, Param, UseGuards, Query, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateInvoiceUseCase } from '../../../domain/use-cases/invoice/create-invoice.use-case';
import { VerifyPaymentStatusUseCase } from '../../../domain/use-cases/invoice/verify-payment-status.use-case';
import { GetInvoiceByIdUseCase } from '../../../domain/use-cases/invoice/get-invoice-by-id.use-case';
import { GetInvoicesByStudentUseCase } from '../../../domain/use-cases/invoice/get-invoices-by-student.use-case';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { InvoiceMapper } from '../../../application/mappers/invoice.mapper';
import { InvoiceResponseDto } from '../../../application/dto/invoice/invoice-response.dto';

// Import cache interceptor and pagination helper
import { CacheInterceptor } from '@nestjs/cache-manager';
import { paginate } from '../../../shared/utils/pagination';

class CreateInvoiceDto {
  studentId: number;
  amount: number;
  concept: string;
  dueDate: Date;
  termId?: number;
  description?: string;
}

@ApiTags('facturas')
@Controller('invoices')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InvoiceController {
  constructor(
    private readonly createInvoiceUseCase: CreateInvoiceUseCase,
    private readonly verifyPaymentStatusUseCase: VerifyPaymentStatusUseCase,
    private readonly getInvoiceByIdUseCase: GetInvoiceByIdUseCase,
    private readonly getInvoicesByStudentUseCase: GetInvoicesByStudentUseCase,
  ) {}

  /**
   * Crear una nueva factura.
   */
  @Post()
  @Roles('admin', 'finance')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una factura' })
  @ApiResponse({ status: 201, description: 'Factura creada', type: InvoiceResponseDto })
  async create(@Body() createInvoiceDto: CreateInvoiceDto): Promise<InvoiceResponseDto> {
    const invoice = await this.createInvoiceUseCase.execute(createInvoiceDto);
    return InvoiceMapper.toResponseDto(invoice);
  }

  /**
   * Obtener todas las facturas de un estudiante.
   */
  @Get('student/:id')
  @Roles('admin', 'finance', 'student')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener facturas por estudiante' })
  @ApiResponse({ status: 200, description: 'Lista de facturas', type: [InvoiceResponseDto] })
  @UseInterceptors(CacheInterceptor)
  async getByStudent(
    @Param('id') id: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<InvoiceResponseDto[]> {
    const invoices = await this.getInvoicesByStudentUseCase.execute(+id);
    const dtos = InvoiceMapper.toResponseDtoArray(invoices);
    const pageNum = page ? parseInt(page) : undefined;
    const limitNum = limit ? parseInt(limit) : undefined;
    return paginate(dtos, pageNum, limitNum);
  }

  /**
   * Obtener el estado del pago de las facturas de un estudiante.
   */
  @Get('student/:id/payment-status')
  @Roles('admin', 'finance', 'student')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Verificar el estado de pago de un estudiante' })
  @ApiResponse({ status: 200, description: 'Estado de pago' })
  async getPaymentStatus(@Param('id') id: string) {
    return this.verifyPaymentStatusUseCase.execute(+id);
  }

  /**
   * Obtener una factura por su identificador.
   */
  @Get(':id')
  @Roles('admin', 'finance', 'student')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener una factura por ID' })
  @ApiResponse({ status: 200, description: 'Factura encontrada', type: InvoiceResponseDto })
  @ApiResponse({ status: 404, description: 'Factura no encontrada' })
  async getById(@Param('id') id: string): Promise<InvoiceResponseDto> {
    const invoice = await this.getInvoiceByIdUseCase.execute(+id);
    return InvoiceMapper.toResponseDto(invoice);
  }
}