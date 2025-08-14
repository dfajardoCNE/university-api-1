import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { StudyPlanRepository } from '../../repositories/study-plan.repository';
import { StudyPlan } from '../../entities/study-plan.entity';

@Injectable()
export class UpdateStudyPlanUseCase {
  constructor(
    @Inject('StudyPlanRepository')
    private readonly repository: StudyPlanRepository,
  ) {}

  async execute(id: number, data: Partial<StudyPlan>): Promise<StudyPlan> {
    // Ensure plan exists before updating
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundException('Study plan not found');
    }
    return this.repository.update(id, data);
  }
}