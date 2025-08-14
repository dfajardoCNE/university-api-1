import { ApiProperty } from '@nestjs/swagger';

export class AcademicCalendarResponseDto {
  @ApiProperty({ description: 'ID del evento' })
  id: number;
  @ApiProperty({ description: 'Título del evento' })
  title: string;
  @ApiProperty({ description: 'Descripción del evento', required: false })
  description?: string;
  @ApiProperty({ description: 'Fecha de inicio', type: String, format: 'date-time' })
  startDate: Date;
  @ApiProperty({ description: 'Fecha de fin', type: String, format: 'date-time' })
  endDate: Date;
  @ApiProperty({ description: 'Fecha de creación', type: String, format: 'date-time' })
  createdAt: Date;
  @ApiProperty({ description: 'Fecha de actualización', type: String, format: 'date-time' })
  updatedAt: Date;
}