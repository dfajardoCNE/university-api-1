import { Enrollment } from '../../domain/entities/enrollment.entity';
import { EnrollmentResponseDto } from '../dto/enrollment/enrollment-response.dto';

export class EnrollmentMapper {
  static toResponseDto(enrollment: Enrollment): EnrollmentResponseDto {
    return {
      id: enrollment.id,
      studentId: enrollment.studentId,
      termId: enrollment.termId,
      status: enrollment.status,
      enrollmentDate: enrollment.enrollmentDate,
      createdAt: enrollment.createdAt,
      updatedAt: enrollment.updatedAt,
      studentName: enrollment.studentName,
      termName: enrollment.termName,
    } as EnrollmentResponseDto;
  }
  static toResponseDtoArray(enrollments: Enrollment[]): EnrollmentResponseDto[] {
    return enrollments.map(e => this.toResponseDto(e));
  }
}