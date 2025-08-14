import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEnrollmentDto {
  @ApiProperty({ description: 'ID del estudiante' })
  @IsNotEmpty()
  @IsNumber()
  studentId: number;

  @ApiProperty({ description: 'ID del periodo (término)' })
  @IsNotEmpty()
  @IsNumber()
  termId: number;

  @ApiPropertyOptional({ description: 'Estado de la matrícula', default: 'registered' })
  @IsOptional()
  @IsString()
  status?: string = 'registered';

  @ApiPropertyOptional({ description: 'Fecha de matrícula', type: String, format: 'date-time' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  enrollmentDate?: Date;
}