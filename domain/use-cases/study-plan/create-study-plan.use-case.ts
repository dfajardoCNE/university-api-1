import { Injectable, Inject } from '@nestjs/common';
import { StudyPlanRepository } from '../../repositories/study-plan.repository';
import { StudyPlan } from '../../entities/study-plan.entity';

@Injectable()
export class CreateStudyPlanUseCase {
  constructor(
    @Inject('StudyPlanRepository')
    private readonly repository: StudyPlanRepository,
  ) {}

  async execute(data: Partial<StudyPlan>): Promise<StudyPlan> {
    return this.repository.create(data);
  }
}