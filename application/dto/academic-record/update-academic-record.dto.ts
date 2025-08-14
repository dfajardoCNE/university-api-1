import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsPositive } from 'class-validator';

/**
 * DTO for updating an academic record. All fields are optional.
 */
export class UpdateAcademicRecordDto {
  @ApiPropertyOptional({ description: 'ID del estudiante' })
  @IsOptional()
  @IsNumber()
  studentId?: number;

  @ApiPropertyOptional({ description: 'ID del curso' })
  @IsOptional()
  @IsNumber()
  courseId?: number;

  @ApiPropertyOptional({ description: 'ID del término académico' })
  @IsOptional()
  @IsNumber()
  termId?: number;

  @ApiPropertyOptional({ description: 'Calificación obtenida', example: 90.0 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  grade?: number;
}