import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { GetOverviewUseCase } from '../../../domain/use-cases/analytics/get-overview.use-case';

@ApiTags('analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly getOverviewUseCase: GetOverviewUseCase) {}

  @Get('overview')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener estadísticas generales del sistema' })
  @ApiResponse({ status: 200, description: 'Resumen general' })
  async getOverview() {
    return this.getOverviewUseCase.execute();
  }
}