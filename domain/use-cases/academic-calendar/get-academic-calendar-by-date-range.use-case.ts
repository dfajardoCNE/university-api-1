import { Injectable, Inject } from '@nestjs/common';
import { AcademicCalendar } from '../../entities/academic-calendar.entity';
import { AcademicCalendarRepository } from '../../repositories/academic-calendar.repository';

@Injectable()
export class GetAcademicCalendarByDateRangeUseCase {
  constructor(@Inject('AcademicCalendarRepository') private readonly repository: AcademicCalendarRepository) {}
  async execute(start: Date, end: Date): Promise<AcademicCalendar[]> {
    return this.repository.findByDateRange(start, end);
  }
}