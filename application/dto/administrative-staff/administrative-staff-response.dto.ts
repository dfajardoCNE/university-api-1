import { ApiProperty } from '@nestjs/swagger';

/**
 * Response DTO representing an administrative staff member.
 *
 * This DTO exposes only the fields we want to return to API consumers,
 * decoupling the domain entity from the external representation. Additional
 * properties such as person and department names are optional and only
 * populated when needed.
 */
export class AdministrativeStaffResponseDto {
  @ApiProperty({ description: 'ID del personal administrativo' })
  id: number;

  @ApiProperty({ description: 'ID de la persona asociada' })
  personId: number;

  @ApiProperty({ description: 'ID del departamento' })
  departmentId: number;

  @ApiProperty({ description: 'Puesto o cargo' })
  position: string;

  @ApiProperty({ description: 'Fecha de contratación', type: String, format: 'date-time' })
  hireDate: Date;

  @ApiProperty({ description: 'Estado laboral actual' })
  status: string;

  @ApiProperty({ description: 'Fecha de creación del registro', type: String, format: 'date-time' })
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de actualización del registro', type: String, format: 'date-time' })
  updatedAt: Date;

  // Campos opcionales para consultas enriquecidas
  @ApiProperty({ description: 'Nombre de la persona', required: false })
  firstName?: string;

  @ApiProperty({ description: 'Apellido de la persona', required: false })
  lastName?: string;

  @ApiProperty({ description: 'Correo electrónico de la persona', required: false })
  email?: string;

  @ApiProperty({ description: 'Nombre del departamento', required: false })
  departmentName?: string;
}