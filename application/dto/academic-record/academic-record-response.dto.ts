import { ApiProperty } from '@nestjs/swagger';

/**
 * Response DTO representing an academic record.
 */
export class AcademicRecordResponseDto {
  @ApiProperty({ description: 'ID del registro académico' })
  id: number;
  @ApiProperty({ description: 'ID del estudiante' })
  studentId: number;
  @ApiProperty({ description: 'ID del curso' })
  courseId: number;
  @ApiProperty({ description: 'ID del término académico' })
  termId: number;
  @ApiProperty({ description: 'Calificación obtenida' })
  grade: number;
  @ApiProperty({ description: 'Fecha de creación', type: String, format: 'date-time' })
  createdAt: Date;
  @ApiProperty({ description: 'Fecha de actualización', type: String, format: 'date-time' })
  updatedAt: Date;

  // Enriched fields
  @ApiProperty({ description: 'Nombre del estudiante', required: false })
  studentName?: string;
  @ApiProperty({ description: 'Nombre del curso', required: false })
  courseName?: string;
  @ApiProperty({ description: 'Nombre del término', required: false })
  termName?: string;
}