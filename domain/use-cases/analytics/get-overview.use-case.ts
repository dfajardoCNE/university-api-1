import { Injectable, Inject } from '@nestjs/common';

/**
 * Caso de uso para obtener un resumen general del sistema. Este caso de uso
 * delega la obtención de datos al repositorio de analytics.
 */
@Injectable()
export class GetOverviewUseCase {
  constructor(
    @Inject('AnalyticsRepository')
    private readonly analyticsRepository: any,
  ) {}

  async execute() {
    return this.analyticsRepository.getOverview();
  }
}