import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { GetOverviewUseCase } from '../../../domain/use-cases/analytics/get-overview.use-case';

import { RepositoriesModule } from '../../../infrastructure/database/repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  controllers: [AnalyticsController],
  providers: [GetOverviewUseCase],
})
export class AnalyticsModule {}