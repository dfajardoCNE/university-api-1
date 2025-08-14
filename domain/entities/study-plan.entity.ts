import { StudyPlanCourse } from './study-plan-course.entity';

/**
 * Entidad de dominio que representa un Plan de Estudio para una carrera.
 * Un plan de estudio contiene un conjunto de cursos recomendados por término.
 */
export class StudyPlan {
  id!: number;
  careerId!: number;
  name!: string;
  description?: string;
  createdAt!: Date;
  updatedAt?: Date;

  // Relaciones opcionales
  planCourses?: StudyPlanCourse[];
}