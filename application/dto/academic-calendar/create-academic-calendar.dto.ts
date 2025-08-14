import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAcademicCalendarDto {
  @ApiProperty({ description: 'Título del evento' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Descripción del evento', required: false })
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Fecha de inicio del evento', type: String, format: 'date-time' })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @ApiProperty({ description: 'Fecha de fin del evento', type: String, format: 'date-time' })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  endDate: Date;
}