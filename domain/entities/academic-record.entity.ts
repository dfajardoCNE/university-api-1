/**
 * Domain entity representing an academic record for a student's enrollment in a course.
 *
 * Each record links a student, a course and a term with a grade. Optional fields
 * may be used to display related entity information when joining with other tables.
 */
export class AcademicRecord {
  id: number;
  studentId: number;
  courseId: number;
  termId: number;
  grade: number;
  createdAt: Date;
  updatedAt: Date;

  // Opcional: nombres de estudiante, curso y término para respuestas enriquecidas
  studentName?: string;
  courseName?: string;
  termName?: string;
}