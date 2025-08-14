import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { AcademicCalendar } from '../../entities/academic-calendar.entity';
import { AcademicCalendarRepository } from '../../repositories/academic-calendar.repository';

@Injectable()
export class GetAcademicCalendarByIdUseCase {
  constructor(@Inject('AcademicCalendarRepository') private readonly repository: AcademicCalendarRepository) {}
  async execute(id: number): Promise<AcademicCalendar> {
    const event = await this.repository.findById(id);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }
}