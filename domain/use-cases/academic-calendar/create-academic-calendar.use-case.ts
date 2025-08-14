import { Injectable, Inject } from '@nestjs/common';
import { AcademicCalendar } from '../../entities/academic-calendar.entity';
import { AcademicCalendarRepository } from '../../repositories/academic-calendar.repository';

@Injectable()
export class CreateAcademicCalendarUseCase {
  constructor(@Inject('AcademicCalendarRepository') private readonly repository: AcademicCalendarRepository) {}
  async execute(event: Partial<AcademicCalendar>): Promise<AcademicCalendar> {
    return this.repository.create(event);
  }
}