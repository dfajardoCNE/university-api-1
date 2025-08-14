import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsOptional } from 'class-validator';

/**
 * DTO for creating an academic record. Requires studentId, courseId, termId and grade.
 */
export class CreateAcademicRecordDto {
  @ApiProperty({ description: 'ID del estudiante' })
  @IsNotEmpty()
  @IsNumber()
  studentId: number;

  @ApiProperty({ description: 'ID del curso' })
  @IsNotEmpty()
  @IsNumber()
  courseId: number;

  @ApiProperty({ description: 'ID del término académico' })
  @IsNotEmpty()
  @IsNumber()
  termId: number;

  @ApiProperty({ description: 'Calificación obtenida', example: 85.5 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  grade: number;
}