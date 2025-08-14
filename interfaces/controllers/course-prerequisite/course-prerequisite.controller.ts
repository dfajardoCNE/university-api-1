import { Controller, Get, Post, Delete, Body, Param, UseGuards, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { CreateCoursePrerequisiteDto } from '../../../application/dto/course-prerequisite/create-course-prerequisite.dto';
import { CoursePrerequisiteResponseDto } from '../../../application/dto/course-prerequisite/course-prerequisite-response.dto';
import { GetPrerequisitesForCourseUseCase } from '../../../domain/use-cases/course-prerequisite/get-prerequisites-for-course.use-case';
import { GetCoursesByPrerequisiteUseCase } from '../../../domain/use-cases/course-prerequisite/get-courses-by-prerequisite.use-case';
import { CreateCoursePrerequisiteUseCase } from '../../../domain/use-cases/course-prerequisite/create-course-prerequisite.use-case';
import { DeleteCoursePrerequisiteUseCase } from '../../../domain/use-cases/course-prerequisite/delete-course-prerequisite.use-case';

// Import cache interceptor and pagination helper
import { CacheInterceptor } from '@nestjs/cache-manager';
import { paginate } from '../../../shared/utils/pagination';

@ApiTags('prerrequisitos')
@Controller('course-prerequisites')
export class CoursePrerequisiteController {
  constructor(
    private readonly getPrerequisitesForCourseUseCase: GetPrerequisitesForCourseUseCase,
    private readonly getCoursesByPrerequisiteUseCase: GetCoursesByPrerequisiteUseCase,
    private readonly createCoursePrerequisiteUseCase: CreateCoursePrerequisiteUseCase,
    private readonly deleteCoursePrerequisiteUseCase: DeleteCoursePrerequisiteUseCase,
  ) {}

  @Get('course/:courseId')
  @ApiOperation({ summary: 'Obtener los prerrequisitos de un curso' })
  @ApiResponse({ status: 200, description: 'Lista de prerrequisitos', type: [CoursePrerequisiteResponseDto] })
  @UseInterceptors(CacheInterceptor)
  async getPrerequisites(
    @Param('courseId') courseId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<CoursePrerequisiteResponseDto[]> {
    const prerequisites = await this.getPrerequisitesForCourseUseCase.execute(+courseId);
    const pageNum = page ? parseInt(page) : undefined;
    const limitNum = limit ? parseInt(limit) : undefined;
    return paginate(prerequisites, pageNum, limitNum);
  }

  @Get('prerequisite/:prerequisiteId')
  @ApiOperation({ summary: 'Obtener los cursos que tienen un prerrequisito específico' })
  @ApiResponse({ status: 200, description: 'Lista de cursos', type: [CoursePrerequisiteResponseDto] })
  @UseInterceptors(CacheInterceptor)
  async getCourses(
    @Param('prerequisiteId') prerequisiteId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<CoursePrerequisiteResponseDto[]> {
    const courses = await this.getCoursesByPrerequisiteUseCase.execute(+prerequisiteId);
    const pageNum = page ? parseInt(page) : undefined;
    const limitNum = limit ? parseInt(limit) : undefined;
    return paginate(courses, pageNum, limitNum);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo prerrequisito de curso' })
  @ApiResponse({ status: 201, description: 'Prerrequisito creado', type: CoursePrerequisiteResponseDto })
  async create(@Body() createDto: CreateCoursePrerequisiteDto): Promise<CoursePrerequisiteResponseDto> {
    return this.createCoursePrerequisiteUseCase.execute(createDto);
  }

  @Delete(':courseId/:prerequisiteId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un prerrequisito de curso' })
  @ApiResponse({ status: 200, description: 'Prerrequisito eliminado' })
  async remove(
    @Param('courseId') courseId: string,
    @Param('prerequisiteId') prerequisiteId: string,
  ): Promise<void> {
    return this.deleteCoursePrerequisiteUseCase.execute(+courseId, +prerequisiteId);
  }
}
