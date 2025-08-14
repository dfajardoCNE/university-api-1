import { Module } from '@nestjs/common';
import { StudyPlanController } from './study-plan.controller';
import { GetAllStudyPlansUseCase } from '../../../domain/use-cases/study-plan/get-all-study-plans.use-case';
import { GetStudyPlanByIdUseCase } from '../../../domain/use-cases/study-plan/get-study-plan-by-id.use-case';
import { GetStudyPlansByCareerUseCase } from '../../../domain/use-cases/study-plan/get-study-plans-by-career.use-case';
import { CreateStudyPlanUseCase } from '../../../domain/use-cases/study-plan/create-study-plan.use-case';
import { UpdateStudyPlanUseCase } from '../../../domain/use-cases/study-plan/update-study-plan.use-case';
import { DeleteStudyPlanUseCase } from '../../../domain/use-cases/study-plan/delete-study-plan.use-case';

import { RepositoriesModule } from '../../../infrastructure/database/repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  controllers: [StudyPlanController],
  providers: [
    GetAllStudyPlansUseCase,
    GetStudyPlanByIdUseCase,
    GetStudyPlansByCareerUseCase,
    CreateStudyPlanUseCase,
    UpdateStudyPlanUseCase,
    DeleteStudyPlanUseCase,
  ],
})
export class StudyPlanModule {}