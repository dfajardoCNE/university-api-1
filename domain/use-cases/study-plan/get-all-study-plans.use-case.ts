import { Injectable, Inject } from '@nestjs/common';
import { StudyPlanRepository } from '../../repositories/study-plan.repository';
import { StudyPlan } from '../../entities/study-plan.entity';

@Injectable()
export class GetAllStudyPlansUseCase {
  constructor(
    @Inject('StudyPlanRepository')
    private readonly repository: StudyPlanRepository,
  ) {}

  async execute(): Promise<StudyPlan[]> {
    return this.repository.findAll();
  }
}