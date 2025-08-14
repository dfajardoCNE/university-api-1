import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { CreateAdministrativeStaffDto } from '../../../application/dto/administrative-staff/create-administrative-staff.dto';
import { UpdateAdministrativeStaffDto } from '../../../application/dto/administrative-staff/update-administrative-staff.dto';
import { AdministrativeStaffResponseDto } from '../../../application/dto/administrative-staff/administrative-staff-response.dto';
import { AdministrativeStaffMapper } from '../../../application/mappers/administrative-staff.mapper';
import { GetAllAdministrativeStaffUseCase } from '../../../domain/use-cases/administrative-staff/get-all-administrative-staff.use-case';
import { GetAdministrativeStaffByIdUseCase } from '../../../domain/use-cases/administrative-staff/get-administrative-staff-by-id.use-case';
import { GetAdministrativeStaffByDepartmentUseCase } from '../../../domain/use-cases/administrative-staff/get-administrative-staff-by-department.use-case';
import { CreateAdministrativeStaffUseCase } from '../../../domain/use-cases/administrative-staff/create-administrative-staff.use-case';
import { UpdateAdministrativeStaffUseCase } from '../../../domain/use-cases/administrative-staff/update-administrative-staff.use-case';
import { DeleteAdministrativeStaffUseCase } from '../../../domain/use-cases/administrative-staff/delete-administrative-staff.use-case';

@ApiTags('personal-administrativo')
@Controller('administrative-staff')
export class AdministrativeStaffController {
  constructor(
    private readonly getAllStaffUseCase: GetAllAdministrativeStaffUseCase,
    private readonly getStaffByIdUseCase: GetAdministrativeStaffByIdUseCase,
    private readonly getStaffByDepartmentUseCase: GetAdministrativeStaffByDepartmentUseCase,
    private readonly createStaffUseCase: CreateAdministrativeStaffUseCase,
    private readonly updateStaffUseCase: UpdateAdministrativeStaffUseCase,
    private readonly deleteStaffUseCase: DeleteAdministrativeStaffUseCase,
  ) {}

  /**
   * Retrieve all administrative staff members. Optionally filter by department
   * using the `departmentId` query parameter.
   */
  @Get()
  @UseInterceptors(CacheInterceptor)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todo el personal administrativo' })
  @ApiResponse({ status: 200, description: 'Lista del personal administrativo', type: [AdministrativeStaffResponseDto] })
  async findAll(
    @Query('departmentId') departmentId?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<AdministrativeStaffResponseDto[]> {
    let staff;
    if (departmentId) {
      staff = await this.getStaffByDepartmentUseCase.execute(+departmentId);
    } else {
      staff = await this.getAllStaffUseCase.execute();
    }
    const dtoArray = AdministrativeStaffMapper.toResponseDtoArray(staff);
    // Implement simple pagination if page and limit are provided
    const pageNum = page ? parseInt(page) : undefined;
    const limitNum = limit ? parseInt(limit) : undefined;
    if (pageNum && limitNum) {
      const start = (pageNum - 1) * limitNum;
      return dtoArray.slice(start, start + limitNum);
    }
    return dtoArray;
  }

  /**
   * Retrieve a single administrative staff member by ID.
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener personal administrativo por ID' })
  @ApiResponse({ status: 200, description: 'Personal administrativo encontrado', type: AdministrativeStaffResponseDto })
  @ApiResponse({ status: 404, description: 'Personal administrativo no encontrado' })
  async findOne(@Param('id') id: string): Promise<AdministrativeStaffResponseDto> {
    const staff = await this.getStaffByIdUseCase.execute(+id);
    return AdministrativeStaffMapper.toResponseDto(staff);
  }

  /**
   * Create a new administrative staff member.
   */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo personal administrativo' })
  @ApiResponse({ status: 201, description: 'Personal administrativo creado', type: AdministrativeStaffResponseDto })
  async create(@Body() dto: CreateAdministrativeStaffDto): Promise<AdministrativeStaffResponseDto> {
    const staff = await this.createStaffUseCase.execute(dto);
    return AdministrativeStaffMapper.toResponseDto(staff);
  }

  /**
   * Update an existing administrative staff member.
   */
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar personal administrativo' })
  @ApiResponse({ status: 200, description: 'Personal administrativo actualizado', type: AdministrativeStaffResponseDto })
  @ApiResponse({ status: 404, description: 'Personal administrativo no encontrado' })
  async update(@Param('id') id: string, @Body() dto: UpdateAdministrativeStaffDto): Promise<AdministrativeStaffResponseDto> {
    const staff = await this.updateStaffUseCase.execute(+id, dto);
    return AdministrativeStaffMapper.toResponseDto(staff);
  }

  /**
   * Delete an administrative staff member.
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar personal administrativo' })
  @ApiResponse({ status: 200, description: 'Personal administrativo eliminado' })
  @ApiResponse({ status: 404, description: 'Personal administrativo no encontrado' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteStaffUseCase.execute(+id);
  }
}