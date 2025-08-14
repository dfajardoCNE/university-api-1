import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { CreateAcademicCalendarDto } from '../../../application/dto/academic-calendar/create-academic-calendar.dto';
import { UpdateAcademicCalendarDto } from '../../../application/dto/academic-calendar/update-academic-calendar.dto';
import { AcademicCalendarResponseDto } from '../../../application/dto/academic-calendar/academic-calendar-response.dto';
import { AcademicCalendarMapper } from '../../../application/mappers/academic-calendar.mapper';
import { GetAllAcademicCalendarUseCase } from '../../../domain/use-cases/academic-calendar/get-all-academic-calendar.use-case';
import { GetAcademicCalendarByIdUseCase } from '../../../domain/use-cases/academic-calendar/get-academic-calendar-by-id.use-case';
import { GetAcademicCalendarByDateRangeUseCase } from '../../../domain/use-cases/academic-calendar/get-academic-calendar-by-date-range.use-case';
import { CreateAcademicCalendarUseCase } from '../../../domain/use-cases/academic-calendar/create-academic-calendar.use-case';
import { UpdateAcademicCalendarUseCase } from '../../../domain/use-cases/academic-calendar/update-academic-calendar.use-case';
import { DeleteAcademicCalendarUseCase } from '../../../domain/use-cases/academic-calendar/delete-academic-calendar.use-case';

@ApiTags('calendario-academico')
@Controller('academic-calendar')
export class AcademicCalendarController {
  constructor(
    private readonly getAllUseCase: GetAllAcademicCalendarUseCase,
    private readonly getByIdUseCase: GetAcademicCalendarByIdUseCase,
    private readonly getByRangeUseCase: GetAcademicCalendarByDateRangeUseCase,
    private readonly createUseCase: CreateAcademicCalendarUseCase,
    private readonly updateUseCase: UpdateAcademicCalendarUseCase,
    private readonly deleteUseCase: DeleteAcademicCalendarUseCase,
  ) {}

  /**
   * List calendar events. Optionally filter by date range (start & end) and paginate.
   */
  @Get()
  @UseInterceptors(CacheInterceptor)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'profesor')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener eventos del calendario académico' })
  @ApiResponse({ status: 200, description: 'Lista de eventos', type: [AcademicCalendarResponseDto] })
  async findAll(
    @Query('start') start?: string,
    @Query('end') end?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<AcademicCalendarResponseDto[]> {
    let events;
    if (start && end) {
      events = await this.getByRangeUseCase.execute(new Date(start), new Date(end));
    } else {
      events = await this.getAllUseCase.execute();
    }
    const dtoArray = AcademicCalendarMapper.toResponseDtoArray(events);
    const pageNum = page ? parseInt(page) : undefined;
    const limitNum = limit ? parseInt(limit) : undefined;
    if (pageNum && limitNum) {
      const startIndex = (pageNum - 1) * limitNum;
      return dtoArray.slice(startIndex, startIndex + limitNum);
    }
    return dtoArray;
  }

  /**
   * Retrieve a single calendar event by ID.
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'profesor')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener evento del calendario académico por ID' })
  @ApiResponse({ status: 200, description: 'Evento encontrado', type: AcademicCalendarResponseDto })
  @ApiResponse({ status: 404, description: 'Evento no encontrado' })
  async findOne(@Param('id') id: string): Promise<AcademicCalendarResponseDto> {
    const event = await this.getByIdUseCase.execute(+id);
    return AcademicCalendarMapper.toResponseDto(event);
  }

  /**
   * Create a new calendar event.
   */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo evento en el calendario académico' })
  @ApiResponse({ status: 201, description: 'Evento creado', type: AcademicCalendarResponseDto })
  async create(@Body() dto: CreateAcademicCalendarDto): Promise<AcademicCalendarResponseDto> {
    const event = await this.createUseCase.execute(dto);
    return AcademicCalendarMapper.toResponseDto(event);
  }

  /**
   * Update an existing calendar event.
   */
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar evento del calendario académico' })
  @ApiResponse({ status: 200, description: 'Evento actualizado', type: AcademicCalendarResponseDto })
  @ApiResponse({ status: 404, description: 'Evento no encontrado' })
  async update(@Param('id') id: string, @Body() dto: UpdateAcademicCalendarDto): Promise<AcademicCalendarResponseDto> {
    const event = await this.updateUseCase.execute(+id, dto);
    return AcademicCalendarMapper.toResponseDto(event);
  }

  /**
   * Delete a calendar event.
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar evento del calendario académico' })
  @ApiResponse({ status: 200, description: 'Evento eliminado' })
  @ApiResponse({ status: 404, description: 'Evento no encontrado' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteUseCase.execute(+id);
  }
}