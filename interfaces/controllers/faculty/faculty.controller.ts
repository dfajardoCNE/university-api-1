import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { CreateFacultyDto } from '../../../application/dto/faculty/create-faculty.dto';
import { UpdateFacultyDto } from '../../../application/dto/faculty/update-faculty.dto';
import { FacultyResponseDto } from '../../../application/dto/faculty/faculty-response.dto';
import { GetAllFacultiesUseCase } from '../../../domain/use-cases/faculty/get-all-faculties.use-case';
import { GetFacultyByIdUseCase } from '../../../domain/use-cases/faculty/get-faculty-by-id.use-case';
import { GetFacultiesByUniversityUseCase } from '../../../domain/use-cases/faculty/get-faculties-by-university.use-case';
import { CreateFacultyUseCase } from '../../../domain/use-cases/faculty/create-faculty.use-case';
import { UpdateFacultyUseCase } from '../../../domain/use-cases/faculty/update-faculty.use-case';
import { DeleteFacultyUseCase } from '../../../domain/use-cases/faculty/delete-faculty.use-case';

// Import cache interceptor and pagination helper
import { CacheInterceptor } from '@nestjs/cache-manager';
import { paginate } from '../../../shared/utils/pagination';

@ApiTags('facultades')
@Controller('faculties')
export class FacultyController {
  constructor(
    private readonly getAllFacultiesUseCase: GetAllFacultiesUseCase,
    private readonly getFacultyByIdUseCase: GetFacultyByIdUseCase,
    private readonly getFacultiesByUniversityUseCase: GetFacultiesByUniversityUseCase,
    private readonly createFacultyUseCase: CreateFacultyUseCase,
    private readonly updateFacultyUseCase: UpdateFacultyUseCase,
    private readonly deleteFacultyUseCase: DeleteFacultyUseCase,
  ) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Obtener todas las facultades' })
  @ApiResponse({ status: 200, description: 'Lista de facultades', type: [FacultyResponseDto] })
  async findAll(
    @Query('universityId') universityId?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<FacultyResponseDto[]> {
    let faculties;
    if (universityId) {
      faculties = await this.getFacultiesByUniversityUseCase.execute(+universityId);
    } else {
      faculties = await this.getAllFacultiesUseCase.execute();
    }
    const pageNum = page ? parseInt(page) : undefined;
    const limitNum = limit ? parseInt(limit) : undefined;
    return paginate(faculties, pageNum, limitNum);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una facultad por ID' })
  @ApiResponse({ status: 200, description: 'Facultad encontrada', type: FacultyResponseDto })
  @ApiResponse({ status: 404, description: 'Facultad no encontrada' })
  async findOne(@Param('id') id: string): Promise<FacultyResponseDto> {
    return this.getFacultyByIdUseCase.execute(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una nueva facultad' })
  @ApiResponse({ status: 201, description: 'Facultad creada', type: FacultyResponseDto })
  async create(@Body() createFacultyDto: CreateFacultyDto): Promise<FacultyResponseDto> {
    return this.createFacultyUseCase.execute(createFacultyDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar una facultad' })
  @ApiResponse({ status: 200, description: 'Facultad actualizada', type: FacultyResponseDto })
  @ApiResponse({ status: 404, description: 'Facultad no encontrada' })
  async update(
    @Param('id') id: string,
    @Body() updateFacultyDto: UpdateFacultyDto,
  ): Promise<FacultyResponseDto> {
    return this.updateFacultyUseCase.execute(+id, updateFacultyDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar una facultad' })
  @ApiResponse({ status: 200, description: 'Facultad eliminada' })
  @ApiResponse({ status: 404, description: 'Facultad no encontrada' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.deleteFacultyUseCase.execute(+id);
  }
}
