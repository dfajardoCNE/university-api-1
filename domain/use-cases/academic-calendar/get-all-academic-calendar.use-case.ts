import { Injectable, Inject } from '@nestjs/common';
import { AcademicCalendar } from '../../entities/academic-calendar.entity';
import { AcademicCalendarRepository } from '../../repositories/academic-calendar.repository';

@Injectable()
export class GetAllAcademicCalendarUseCase {
  constructor(@Inject('AcademicCalendarRepository') private readonly repository: AcademicCalendarRepository) {}
  async execute(): Promise<AcademicCalendar[]> {
    return this.repository.findAll();
  }
}