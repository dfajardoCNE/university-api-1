import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Data Transfer Object used when creating a new administrative staff member.
 *
 * This DTO validates incoming data and provides Swagger metadata for API
 * documentation. It ensures required fields are provided and correctly
 * typed, promoting robust input validation across the application.
 */
export class CreateAdministrativeStaffDto {
  @ApiProperty({ description: 'ID de la persona asociada al personal administrativo' })
  @IsNotEmpty()
  @IsNumber()
  personId: number;

  @ApiProperty({ description: 'ID del departamento al que pertenece' })
  @IsNotEmpty()
  @IsNumber()
  departmentId: number;

  @ApiProperty({ description: 'Puesto o cargo del personal administrativo' })
  @IsNotEmpty()
  @IsString()
  position: string;

  @ApiProperty({ description: 'Fecha de contratación', type: String, format: 'date-time' })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  hireDate: Date;

  @ApiProperty({ description: 'Estado laboral actual', default: 'active', required: false })
  @IsOptional()
  @IsString()
  status?: string = 'active';
}