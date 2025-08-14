import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateEnrollmentDto {
  @ApiPropertyOptional({ description: 'ID del estudiante' })
  @IsOptional()
  @IsNumber()
  studentId?: number;

  @ApiPropertyOptional({ description: 'ID del periodo (término)' })
  @IsOptional()
  @IsNumber()
  termId?: number;

  @ApiPropertyOptional({ description: 'Estado de la matrícula' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ description: 'Fecha de matrícula', type: String, format: 'date-time' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  enrollmentDate?: Date;
}