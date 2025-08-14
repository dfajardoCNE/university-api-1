import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { StudyPlanRepository } from '../../repositories/study-plan.repository';
import { StudyPlan } from '../../entities/study-plan.entity';

@Injectable()
export class GetStudyPlanByIdUseCase {
  constructor(
    @Inject('StudyPlanRepository')
    private readonly repository: StudyPlanRepository,
  ) {}

  async execute(id: number): Promise<StudyPlan> {
    const plan = await this.repository.findById(id);
    if (!plan) {
      throw new NotFoundException('Study plan not found');
    }
    return plan;
  }
}