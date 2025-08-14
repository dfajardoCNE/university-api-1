import { AcademicCalendar } from '../entities/academic-calendar.entity';

/**
 * Repository contract for academic calendar events.
 */
export interface AcademicCalendarRepository {
  findAll(): Promise<AcademicCalendar[]>;
  findById(id: number): Promise<AcademicCalendar | null>;
  findByDateRange(start: Date, end: Date): Promise<AcademicCalendar[]>;
  create(event: Partial<AcademicCalendar>): Promise<AcademicCalendar>;
  update(id: number, event: Partial<AcademicCalendar>): Promise<AcademicCalendar>;
  delete(id: number): Promise<void>;
}