import { Controller, Get, Post, Body, Param, UseGuards, Query, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { CreatePaymentUseCase } from '../../../domain/use-cases/payment/create-payment.use-case';
import { GetPaymentByIdUseCase } from '../../../domain/use-cases/payment/get-payment-by-id.use-case';
import { GetPaymentsByStudentUseCase } from '../../../domain/use-cases/payment/get-payments-by-student.use-case';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { PaymentMapper } from '../../../application/mappers/payment.mapper';
import { PaymentResponseDto } from '../../../application/dto/payment/payment-response.dto';
import { paginate } from '../../../shared/utils/pagination';

class CreatePaymentDto {
  studentId: number;
  amount: number;
  concept: string;
  paymentMethod: string;
  referenceNumber?: string;
  termId?: number;
  description?: string;
}

@ApiTags('pagos')
@Controller('payments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaymentController {
  constructor(
    private readonly createPaymentUseCase: CreatePaymentUseCase,
    private readonly getPaymentByIdUseCase: GetPaymentByIdUseCase,
    private readonly getPaymentsByStudentUseCase: GetPaymentsByStudentUseCase,
  ) {}

  /**
   * Register a new payment.
   */
  @Post()
  @Roles('admin', 'finance')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo pago' })
  @ApiResponse({ status: 201, description: 'Pago creado', type: PaymentResponseDto })
  async create(@Body() createPaymentDto: CreatePaymentDto): Promise<PaymentResponseDto> {
    const payment = await this.createPaymentUseCase.execute(createPaymentDto);
    return PaymentMapper.toResponseDto(payment);
  }

  /**
   * Get all payments for a given student.
   */
  @Get('student/:id')
  @Roles('admin', 'finance', 'student')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener pagos por estudiante' })
  @ApiResponse({ status: 200, description: 'Lista de pagos', type: [PaymentResponseDto] })
  @UseInterceptors(CacheInterceptor)
  async getByStudent(
    @Param('id') id: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<PaymentResponseDto[]> {
    const payments = await this.getPaymentsByStudentUseCase.execute(+id);
    const dtos = PaymentMapper.toResponseDtoArray(payments);
    const pageNum = page ? parseInt(page) : undefined;
    const limitNum = limit ? parseInt(limit) : undefined;
    return paginate(dtos, pageNum, limitNum);
  }

  /**
   * Get a payment by its identifier.
   */
  @Get(':id')
  @Roles('admin', 'finance')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener un pago por ID' })
  @ApiResponse({ status: 200, description: 'Pago encontrado', type: PaymentResponseDto })
  @ApiResponse({ status: 404, description: 'Pago no encontrado' })
  async getById(@Param('id') id: string): Promise<PaymentResponseDto> {
    const payment = await this.getPaymentByIdUseCase.execute(+id);
    return PaymentMapper.toResponseDto(payment);
  }
}