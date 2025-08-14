import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { StudyPlanRepository } from '../../repositories/study-plan.repository';

@Injectable()
export class DeleteStudyPlanUseCase {
  constructor(
    @Inject('StudyPlanRepository')
    private readonly repository: StudyPlanRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundException('Study plan not found');
    }
    await this.repository.delete(id);
  }
}