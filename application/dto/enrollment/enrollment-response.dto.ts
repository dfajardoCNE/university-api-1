import { ApiProperty } from '@nestjs/swagger';

export class EnrollmentResponseDto {
  @ApiProperty({ description: 'ID de la matrícula' })
  id: number;
  @ApiProperty({ description: 'ID del estudiante' })
  studentId: number;
  @ApiProperty({ description: 'ID del periodo (término)' })
  termId: number;
  @ApiProperty({ description: 'Estado de la matrícula' })
  status: string;
  @ApiProperty({ description: 'Fecha de matrícula', type: String, format: 'date-time' })
  enrollmentDate: Date;
  @ApiProperty({ description: 'Fecha de creación', type: String, format: 'date-time' })
  createdAt: Date;
  @ApiProperty({ description: 'Fecha de actualización', type: String, format: 'date-time' })
  updatedAt: Date;
  // Optional names for enriched responses
  @ApiProperty({ description: 'Nombre del estudiante', required: false })
  studentName?: string;
  @ApiProperty({ description: 'Nombre del período', required: false })
  termName?: string;
}