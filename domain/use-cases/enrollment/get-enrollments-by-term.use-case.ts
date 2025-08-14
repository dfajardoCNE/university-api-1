import { Injectable, Inject } from '@nestjs/common';
import { Enrollment } from '../../entities/enrollment.entity';
import { EnrollmentRepository } from '../../repositories/enrollment.repository';

@Injectable()
export class GetEnrollmentsByTermUseCase {
  constructor(@Inject('EnrollmentRepository') private readonly repository: EnrollmentRepository) {}
  async execute(termId: number): Promise<Enrollment[]> {
    return this.repository.findByTerm(termId);
  }
}