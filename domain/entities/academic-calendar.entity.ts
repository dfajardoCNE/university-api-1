/**
 * Domain entity representing a calendar event in the academic calendar.
 */
export class AcademicCalendar {
  id: number;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}