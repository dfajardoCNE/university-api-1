import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { GetAllStudyPlansUseCase } from '../../../domain/use-cases/study-plan/get-all-study-plans.use-case';
import { GetStudyPlanByIdUseCase } from '../../../domain/use-cases/study-plan/get-study-plan-by-id.use-case';
import { GetStudyPlansByCareerUseCase } from '../../../domain/use-cases/study-plan/get-study-plans-by-career.use-case';
import { CreateStudyPlanUseCase } from '../../../domain/use-cases/study-plan/create-study-plan.use-case';
import { UpdateStudyPlanUseCase } from '../../../domain/use-cases/study-plan/update-study-plan.use-case';
import { DeleteStudyPlanUseCase } from '../../../domain/use-cases/study-plan/delete-study-plan.use-case';
import { CreateStudyPlanDto } from '../../../application/dto/study-plan/create-study-plan.dto';
import { UpdateStudyPlanDto } from '../../../application/dto/study-plan/update-study-plan.dto';
import { StudyPlanResponseDto } from '../../../application/dto/study-plan/study-plan-response.dto';
import { StudyPlanMapper } from '../../../application/mappers/study-plan.mapper';
import { StudyPlan } from '../../../domain/entities/study-plan.entity';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { paginate } from '../../../shared/utils/pagination';

@ApiTags('planes de estudio')
@Controller('study-plans')
export class StudyPlanController {
  constructor(
    private readonly getAllUseCase: GetAllStudyPlansUseCase,
    private readonly getByIdUseCase: GetStudyPlanByIdUseCase,
    private readonly getByCareerUseCase: GetStudyPlansByCareerUseCase,
    private readonly createUseCase: CreateStudyPlanUseCase,
    private readonly updateUseCase: UpdateStudyPlanUseCase,
    private readonly deleteUseCase: DeleteStudyPlanUseCase,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'profesor')
  @UseInterceptors(CacheInterceptor)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar todos los planes de estudio' })
  @ApiResponse({ status: 200, description: 'Lista de planes de estudio', type: [StudyPlanResponseDto] })
  async findAll(
    @Query('careerId') careerId?: number,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<StudyPlanResponseDto[]> {
    let plans;
    if (careerId) {
      plans = await this.getByCareerUseCase.execute(+careerId);
    } else {
      plans = await this.getAllUseCase.execute();
    }
    const mappedPlans = plans.map(StudyPlanMapper.toResponseDto);
    const paginated = paginate(mappedPlans, +page, +limit);
    return paginated as StudyPlanResponseDto[];
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'profesor')
  @UseInterceptors(CacheInterceptor)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener un plan de estudio por ID' })
  @ApiResponse({ status: 200, description: 'Plan de estudio', type: StudyPlanResponseDto })
  @ApiResponse({ status: 404, description: 'Plan de estudio no encontrado' })
  async findOne(@Param('id') id: string): Promise<StudyPlanResponseDto> {
    const plan = await this.getByIdUseCase.execute(+id);
    return StudyPlanMapper.toResponseDto(plan);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo plan de estudio' })
  @ApiResponse({ status: 201, description: 'Plan de estudio creado', type: StudyPlanResponseDto })
  async create(@Body() dto: CreateStudyPlanDto): Promise<StudyPlanResponseDto> {
    const entityData: Partial<StudyPlan> = {
      careerId: dto.careerId,
      name: dto.name,
      description: dto.description,
      planCourses: dto.planCourses?.map(course => ({
        courseId: course.courseId,
        termNumber: course.termNumber,
        createdAt: new Date(),
        studyPlanId: 0 // Will be set by the repository/database
      }))
    };
    const created = await this.createUseCase.execute(entityData);
    return StudyPlanMapper.toResponseDto(created);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un plan de estudio' })
  @ApiResponse({ status: 200, description: 'Plan de estudio actualizado', type: StudyPlanResponseDto })
  @ApiResponse({ status: 404, description: 'Plan de estudio no encontrado' })
  async update(@Param('id') id: string, @Body() dto: UpdateStudyPlanDto): Promise<StudyPlanResponseDto> {
    const entityData: Partial<StudyPlan> = {
      careerId: dto.careerId,
      name: dto.name,
      description: dto.description,
      planCourses: dto.planCourses?.map(course => ({
        courseId: course.courseId,
        termNumber: course.termNumber,
        createdAt: new Date(),
        studyPlanId: 0 // Will be set by the repository/database
      }))
    };
    const updated = await this.updateUseCase.execute(+id, entityData);
    return StudyPlanMapper.toResponseDto(updated);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un plan de estudio' })
  @ApiResponse({ status: 204, description: 'Plan de estudio eliminado' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteUseCase.execute(+id);
  }
}