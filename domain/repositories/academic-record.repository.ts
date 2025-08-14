import { AcademicRecord } from '../entities/academic-record.entity';

/**
 * Repository contract for academic records. Defines operations for reading and
 * writing transcript data.
 */
export interface AcademicRecordRepository {
  findAll(): Promise<AcademicRecord[]>;
  findById(id: number): Promise<AcademicRecord | null>;
  findByStudent(studentId: number): Promise<AcademicRecord[]>;
  findByCourse(courseId: number): Promise<AcademicRecord[]>;
  create(record: Partial<AcademicRecord>): Promise<AcademicRecord>;
  update(id: number, record: Partial<AcademicRecord>): Promise<AcademicRecord>;
  delete(id: number): Promise<void>;
}