import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { CreateAcademicRecordDto } from '../../../application/dto/academic-record/create-academic-record.dto';
import { UpdateAcademicRecordDto } from '../../../application/dto/academic-record/update-academic-record.dto';
import { AcademicRecordResponseDto } from '../../../application/dto/academic-record/academic-record-response.dto';
import { AcademicRecordMapper } from '../../../application/mappers/academic-record.mapper';
import { GetAllAcademicRecordsUseCase } from '../../../domain/use-cases/academic-record/get-all-academic-records.use-case';
import { GetAcademicRecordByIdUseCase } from '../../../domain/use-cases/academic-record/get-academic-record-by-id.use-case';
import { GetAcademicRecordsByStudentUseCase } from '../../../domain/use-cases/academic-record/get-academic-records-by-student.use-case';
import { GetAcademicRecordsByCourseUseCase } from '../../../domain/use-cases/academic-record/get-academic-records-by-course.use-case';
import { CreateAcademicRecordUseCase } from '../../../domain/use-cases/academic-record/create-academic-record.use-case';
import { UpdateAcademicRecordUseCase } from '../../../domain/use-cases/academic-record/update-academic-record.use-case';
import { DeleteAcademicRecordUseCase } from '../../../domain/use-cases/academic-record/delete-academic-record.use-case';

@ApiTags('expedientes-academicos')
@Controller('academic-records')
export class AcademicRecordController {
  constructor(
    private readonly getAllRecordsUseCase: GetAllAcademicRecordsUseCase,
    private readonly getRecordByIdUseCase: GetAcademicRecordByIdUseCase,
    private readonly getRecordsByStudentUseCase: GetAcademicRecordsByStudentUseCase,
    private readonly getRecordsByCourseUseCase: GetAcademicRecordsByCourseUseCase,
    private readonly createRecordUseCase: CreateAcademicRecordUseCase,
    private readonly updateRecordUseCase: UpdateAcademicRecordUseCase,
    private readonly deleteRecordUseCase: DeleteAcademicRecordUseCase,
  ) {}

  /**
   * Retrieve academic records. Filter by studentId or courseId if provided.
   */
  @Get()
  @UseInterceptors(CacheInterceptor)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'profesor')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener expedientes académicos' })
  @ApiResponse({ status: 200, description: 'Lista de expedientes', type: [AcademicRecordResponseDto] })
  async findAll(
    @Query('studentId') studentId?: string,
    @Query('courseId') courseId?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<AcademicRecordResponseDto[]> {
    let records;
    if (studentId) {
      records = await this.getRecordsByStudentUseCase.execute(+studentId);
    } else if (courseId) {
      records = await this.getRecordsByCourseUseCase.execute(+courseId);
    } else {
      records = await this.getAllRecordsUseCase.execute();
    }
    const dtoArray = AcademicRecordMapper.toResponseDtoArray(records);
    const pageNum = page ? parseInt(page) : undefined;
    const limitNum = limit ? parseInt(limit) : undefined;
    if (pageNum && limitNum) {
      const start = (pageNum - 1) * limitNum;
      return dtoArray.slice(start, start + limitNum);
    }
    return dtoArray;
  }

  /**
   * Retrieve a single academic record by ID.
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'profesor')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener expediente académico por ID' })
  @ApiResponse({ status: 200, description: 'Expediente encontrado', type: AcademicRecordResponseDto })
  @ApiResponse({ status: 404, description: 'Expediente no encontrado' })
  async findOne(@Param('id') id: string): Promise<AcademicRecordResponseDto> {
    const record = await this.getRecordByIdUseCase.execute(+id);
    return AcademicRecordMapper.toResponseDto(record);
  }

  /**
   * Create a new academic record.
   */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear nuevo expediente académico' })
  @ApiResponse({ status: 201, description: 'Expediente creado', type: AcademicRecordResponseDto })
  async create(@Body() dto: CreateAcademicRecordDto): Promise<AcademicRecordResponseDto> {
    const record = await this.createRecordUseCase.execute(dto);
    return AcademicRecordMapper.toResponseDto(record);
  }

  /**
   * Update an academic record.
   */
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar expediente académico' })
  @ApiResponse({ status: 200, description: 'Expediente actualizado', type: AcademicRecordResponseDto })
  @ApiResponse({ status: 404, description: 'Expediente no encontrado' })
  async update(@Param('id') id: string, @Body() dto: UpdateAcademicRecordDto): Promise<AcademicRecordResponseDto> {
    const record = await this.updateRecordUseCase.execute(+id, dto);
    return AcademicRecordMapper.toResponseDto(record);
  }

  /**
   * Delete an academic record.
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar expediente académico' })
  @ApiResponse({ status: 200, description: 'Expediente eliminado' })
  @ApiResponse({ status: 404, description: 'Expediente no encontrado' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteRecordUseCase.execute(+id);
  }
}