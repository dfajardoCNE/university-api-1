import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Data Transfer Object for updating an administrative staff member.
 *
 * All fields are optional, allowing clients to update only the fields that
 * require changes. Validation decorators ensure proper types when provided.
 */
export class UpdateAdministrativeStaffDto {
  @ApiPropertyOptional({ description: 'ID de la persona asociada al personal administrativo' })
  @IsOptional()
  @IsNumber()
  personId?: number;

  @ApiPropertyOptional({ description: 'ID del departamento al que pertenece' })
  @IsOptional()
  @IsNumber()
  departmentId?: number;

  @ApiPropertyOptional({ description: 'Puesto o cargo del personal administrativo' })
  @IsOptional()
  @IsString()
  position?: string;

  @ApiPropertyOptional({ description: 'Fecha de contratación', type: String, format: 'date-time' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  hireDate?: Date;

  @ApiPropertyOptional({ description: 'Estado laboral actual' })
  @IsOptional()
  @IsString()
  status?: string;
}