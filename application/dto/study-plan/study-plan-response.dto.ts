import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO de respuesta para Plan de Estudio. Expone información básica y
 * opcionalmente los cursos asociados con el número de término.
 */
export class StudyPlanResponseDto {
  @ApiProperty({ description: 'Identificador del plan de estudio' })
  id: number;

  @ApiProperty({ description: 'Identificador de la carrera a la que pertenece' })
  careerId: number;

  @ApiProperty({ description: 'Nombre del plan de estudio' })
  name: string;

  @ApiProperty({ description: 'Descripción del plan de estudio', required: false })
  description?: string;

  @ApiProperty({ description: 'Fecha de creación del plan' })
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de última actualización', required: false })
  updatedAt?: Date;

  @ApiProperty({
    description: 'Lista de cursos en el plan con su término sugerido',
    required: false,
    type: () => [StudyPlanCourseItemDto],
  })
  planCourses?: StudyPlanCourseItemDto[];
}

/**
 * Representación de un curso dentro de un plan de estudios.
 */
export class StudyPlanCourseItemDto {
  @ApiProperty({ description: 'Identificador del curso' })
  courseId: number;

  @ApiProperty({ description: 'Número de término sugerido para cursar' })
  termNumber: number;
}