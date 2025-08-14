import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { AcademicCalendar } from '../../entities/academic-calendar.entity';
import { AcademicCalendarRepository } from '../../repositories/academic-calendar.repository';

@Injectable()
export class UpdateAcademicCalendarUseCase {
  constructor(@Inject('AcademicCalendarRepository') private readonly repository: AcademicCalendarRepository) {}
  async execute(id: number, event: Partial<AcademicCalendar>): Promise<AcademicCalendar> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundException('Event not found');
    }
    return this.repository.update(id, event);
  }
}