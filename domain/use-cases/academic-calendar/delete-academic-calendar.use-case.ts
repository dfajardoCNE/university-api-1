import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { AcademicCalendarRepository } from '../../repositories/academic-calendar.repository';

@Injectable()
export class DeleteAcademicCalendarUseCase {
  constructor(@Inject('AcademicCalendarRepository') private readonly repository: AcademicCalendarRepository) {}
  async execute(id: number): Promise<void> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundException('Event not found');
    }
    await this.repository.delete(id);
  }
}