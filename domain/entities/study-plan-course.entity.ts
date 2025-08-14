/**
 * Entidad que representa la relación entre un plan de estudio y un curso específico.
 * Incluye el número de término sugerido en el que el estudiante debería cursar
 * la asignatura dentro de la malla curricular.
 */
export class StudyPlanCourse {
  studyPlanId?: number;
  courseId!: number;
  termNumber!: number;
  createdAt!: Date;
}