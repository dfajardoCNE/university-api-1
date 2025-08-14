import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { CreateSessionTimeDto } from '../../../application/dto/session-time/create-session-time.dto';
import { UpdateSessionTimeDto } from '../../../application/dto/session-time/update-session-time.dto';
import { SessionTimeResponseDto } from '../../../application/dto/session-time/session-time-response.dto';
import { GetAllSessionTimesUseCase } from '../../../domain/use-cases/session-time/get-all-session-times.use-case';
import { GetSessionTimeByIdUseCase } from '../../../domain/use-cases/session-time/get-session-time-by-id.use-case';
import { GetSessionTimesByDayUseCase } from '../../../domain/use-cases/session-time/get-session-times-by-day.use-case';
import { CreateSessionTimeUseCase } from '../../../domain/use-cases/session-time/create-session-time.use-case';
import { UpdateSessionTimeUseCase } from '../../../domain/use-cases/session-time/update-session-time.use-case';
import { DeleteSessionTimeUseCase } from '../../../domain/use-cases/session-time/delete-session-time.use-case';

// Import cache interceptor and pagination helper
import { CacheInterceptor } from '@nestjs/cache-manager';
import { paginate } from '../../../shared/utils/pagination';

@ApiTags('horarios')
@Controller('session-times')
export class SessionTimeController {
  constructor(
    private readonly getAllSessionTimesUseCase: GetAllSessionTimesUseCase,
    private readonly getSessionTimeByIdUseCase: GetSessionTimeByIdUseCase,
    private readonly getSessionTimesByDayUseCase: GetSessionTimesByDayUseCase,
    private readonly createSessionTimeUseCase: CreateSessionTimeUseCase,
    private readonly updateSessionTimeUseCase: UpdateSessionTimeUseCase,
    private readonly deleteSessionTimeUseCase: DeleteSessionTimeUseCase,
  ) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Obtener todos los horarios de sesión' })
  @ApiResponse({ status: 200, description: 'Lista de horarios de sesión', type: [SessionTimeResponseDto] })
  async findAll(
    @Query('dayOfWeek') dayOfWeek?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<SessionTimeResponseDto[]> {
    let sessionTimes;
    if (dayOfWeek) {
      sessionTimes = await this.getSessionTimesByDayUseCase.execute(+dayOfWeek);
    } else {
      sessionTimes = await this.getAllSessionTimesUseCase.execute();
    }
    const pageNum = page ? parseInt(page) : undefined;
    const limitNum = limit ? parseInt(limit) : undefined;
    return paginate(sessionTimes, pageNum, limitNum);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un horario de sesión por ID' })
  @ApiResponse({ status: 200, description: 'Horario de sesión encontrado', type: SessionTimeResponseDto })
  @ApiResponse({ status: 404, description: 'Horario de sesión no encontrado' })
  async findOne(@Param('id') id: string): Promise<SessionTimeResponseDto> {
    return this.getSessionTimeByIdUseCase.execute(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo horario de sesión' })
  @ApiResponse({ status: 201, description: 'Horario de sesión creado', type: SessionTimeResponseDto })
  async create(@Body() createSessionTimeDto: CreateSessionTimeDto): Promise<SessionTimeResponseDto> {
    return this.createSessionTimeUseCase.execute(createSessionTimeDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un horario de sesión' })
  @ApiResponse({ status: 200, description: 'Horario de sesión actualizado', type: SessionTimeResponseDto })
  @ApiResponse({ status: 404, description: 'Horario de sesión no encontrado' })
  async update(
    @Param('id') id: string,
    @Body() updateSessionTimeDto: UpdateSessionTimeDto,
  ): Promise<SessionTimeResponseDto> {
    return this.updateSessionTimeUseCase.execute(+id, updateSessionTimeDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un horario de sesión' })
  @ApiResponse({ status: 200, description: 'Horario de sesión eliminado' })
  @ApiResponse({ status: 404, description: 'Horario de sesión no encontrado' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.deleteSessionTimeUseCase.execute(+id);
  }
}
