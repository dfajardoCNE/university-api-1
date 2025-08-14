import { Enrollment } from '../entities/enrollment.entity';

/**
 * Repository contract for Enrollment operations.
 */
export interface EnrollmentRepository {
  findAll(): Promise<Enrollment[]>;
  findById(id: number): Promise<Enrollment | null>;
  findByStudent(studentId: number): Promise<Enrollment[]>;
  findByTerm(termId: number): Promise<Enrollment[]>;
  create(enrollment: Partial<Enrollment>): Promise<Enrollment>;
  update(id: number, enrollment: Partial<Enrollment>): Promise<Enrollment>;
  delete(id: number): Promise<void>;
}