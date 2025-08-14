import { Injectable, Inject } from '@nestjs/common';
import { Enrollment } from '../../entities/enrollment.entity';
import { EnrollmentRepository } from '../../repositories/enrollment.repository';

@Injectable()
export class GetEnrollmentsByStudentUseCase {
  constructor(@Inject('EnrollmentRepository') private readonly repository: EnrollmentRepository) {}
  async execute(studentId: number): Promise<Enrollment[]> {
    return this.repository.findByStudent(studentId);
  }
}