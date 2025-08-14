import { AcademicCalendar } from '../../domain/entities/academic-calendar.entity';
import { AcademicCalendarResponseDto } from '../dto/academic-calendar/academic-calendar-response.dto';

export class AcademicCalendarMapper {
  static toResponseDto(event: AcademicCalendar): AcademicCalendarResponseDto {
    return {
      id: event.id,
      title: event.title,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    } as AcademicCalendarResponseDto;
  }
  static toResponseDtoArray(events: AcademicCalendar[]): AcademicCalendarResponseDto[] {
    return events.map(e => this.toResponseDto(e));
  }
}