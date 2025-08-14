/**
 * Domain entity representing a student's enrollment in a term.
 */
export class Enrollment {
  id: number;
  studentId: number;
  termId: number;
  status: string;
  enrollmentDate: Date;
  createdAt: Date;
  updatedAt: Date;

  // Optional: names for joined data
  studentName?: string;
  termName?: string;
}