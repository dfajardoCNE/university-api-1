import { IsInt, Min } from 'class-validator';

/**
 * DTO para asociar un curso a un plan de estudios con su número de término.
 */
export class CreateStudyPlanCourseDto {
  @IsInt()
  @Min(1)
  courseId: number;

  @IsInt()
  @Min(1)
  termNumber: number;
}