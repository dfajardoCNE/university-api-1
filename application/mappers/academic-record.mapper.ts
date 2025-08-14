import { AcademicRecord } from '../../domain/entities/academic-record.entity';
import { AcademicRecordResponseDto } from '../dto/academic-record/academic-record-response.dto';

export class AcademicRecordMapper {
  static toResponseDto(record: AcademicRecord): AcademicRecordResponseDto {
    return {
      id: record.id,
      studentId: record.studentId,
      courseId: record.courseId,
      termId: record.termId,
      grade: record.grade,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      studentName: record.studentName,
      courseName: record.courseName,
      termName: record.termName,
    } as AcademicRecordResponseDto;
  }
  static toResponseDtoArray(records: AcademicRecord[]): AcademicRecordResponseDto[] {
    return records.map(r => this.toResponseDto(r));
  }
}