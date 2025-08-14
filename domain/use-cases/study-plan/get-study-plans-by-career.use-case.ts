import { Injectable, Inject } from '@nestjs/common';
import { StudyPlanRepository } from '../../repositories/study-plan.repository';
import { StudyPlan } from '../../entities/study-plan.entity';

@Injectable()
export class GetStudyPlansByCareerUseCase {
  constructor(
    @Inject('StudyPlanRepository')
    private readonly repository: StudyPlanRepository,
  ) {}

  async execute(careerId: number): Promise<StudyPlan[]> {
    return this.repository.findByCareer(careerId);
  }
}