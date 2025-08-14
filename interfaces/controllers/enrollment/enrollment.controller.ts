import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { CreateEnrollmentDto } from '../../../application/dto/enrollment/create-enrollment.dto';
import { UpdateEnrollmentDto } from '../../../application/dto/enrollment/update-enrollment.dto';
import { EnrollmentResponseDto } from '../../../application/dto/enrollment/enrollment-response.dto';
import { EnrollmentMapper } from '../../../application/mappers/enrollment.mapper';
import { GetAllEnrollmentsUseCase } from '../../../domain/use-cases/enrollment/get-all-enrollments.use-case';
import { GetEnrollmentByIdUseCase } from '../../../domain/use-cases/enrollment/get-enrollment-by-id.use-case';
import { GetEnrollmentsByStudentUseCase } from '../../../domain/use-cases/enrollment/get-enrollments-by-student.use-case';
import { GetEnrollmentsByTermUseCase } from '../../../domain/use-cases/enrollment/get-enrollments-by-term.use-case';
import { CreateEnrollmentUseCase } from '../../../domain/use-cases/enrollment/create-enrollment.use-case';
import { UpdateEnrollmentUseCase } from '../../../domain/use-cases/enrollment/update-enrollment.use-case';
import { DeleteEnrollmentUseCase } from '../../../domain/use-cases/enrollment/delete-enrollment.use-case';

@ApiTags('matriculas')
@Controller('enrollments')
export class EnrollmentController {
  constructor(
    private readonly getAllUseCase: GetAllEnrollmentsUseCase,
    private readonly getByIdUseCase: GetEnrollmentByIdUseCase,
    private readonly getByStudentUseCase: GetEnrollmentsByStudentUseCase,
    private readonly getByTermUseCase: GetEnrollmentsByTermUseCase,
    private readonly createUseCase: CreateEnrollmentUseCase,
    private readonly updateUseCase: UpdateEnrollmentUseCase,
    private readonly deleteUseCase: DeleteEnrollmentUseCase,
  ) {}

  /**
   * List enrollments. Optionally filter by studentId or termId and paginate.
   */
  @Get()
  @UseInterceptors(CacheInterceptor)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'profesor')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener matrículas' })
  @ApiResponse({ status: 200, description: 'Lista de matrículas', type: [EnrollmentResponseDto] })
  async findAll(
    @Query('studentId') studentId?: string,
    @Query('termId') termId?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<EnrollmentResponseDto[]> {
    let enrollments;
    if (studentId) {
      enrollments = await this.getByStudentUseCase.execute(+studentId);
    } else if (termId) {
      enrollments = await this.getByTermUseCase.execute(+termId);
    } else {
      enrollments = await this.getAllUseCase.execute();
    }
    const dtoArray = EnrollmentMapper.toResponseDtoArray(enrollments);
    const pageNum = page ? parseInt(page) : undefined;
    const limitNum = limit ? parseInt(limit) : undefined;
    if (pageNum && limitNum) {
      const startIndex = (pageNum - 1) * limitNum;
      return dtoArray.slice(startIndex, startIndex + limitNum);
    }
    return dtoArray;
  }

  /**
   * Retrieve an enrollment by ID.
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'profesor')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener matrícula por ID' })
  @ApiResponse({ status: 200, description: 'Matrícula encontrada', type: EnrollmentResponseDto })
  @ApiResponse({ status: 404, description: 'Matrícula no encontrada' })
  async findOne(@Param('id') id: string): Promise<EnrollmentResponseDto> {
    const enrollment = await this.getByIdUseCase.execute(+id);
    return EnrollmentMapper.toResponseDto(enrollment);
  }

  /**
   * Create a new enrollment.
   */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear matrícula' })
  @ApiResponse({ status: 201, description: 'Matrícula creada', type: EnrollmentResponseDto })
  async create(@Body() dto: CreateEnrollmentDto): Promise<EnrollmentResponseDto> {
    const enrollment = await this.createUseCase.execute(dto);
    return EnrollmentMapper.toResponseDto(enrollment);
  }

  /**
   * Update an enrollment.
   */
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar matrícula' })
  @ApiResponse({ status: 200, description: 'Matrícula actualizada', type: EnrollmentResponseDto })
  @ApiResponse({ status: 404, description: 'Matrícula no encontrada' })
  async update(@Param('id') id: string, @Body() dto: UpdateEnrollmentDto): Promise<EnrollmentResponseDto> {
    const enrollment = await this.updateUseCase.execute(+id, dto);
    return EnrollmentMapper.toResponseDto(enrollment);
  }

  /**
   * Delete an enrollment.
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar matrícula' })
  @ApiResponse({ status: 200, description: 'Matrícula eliminada' })
  @ApiResponse({ status: 404, description: 'Matrícula no encontrada' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteUseCase.execute(+id);
  }
}