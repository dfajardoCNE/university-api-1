import { Injectable, Inject } from '@nestjs/common';
import { Enrollment } from '../../entities/enrollment.entity';
import { EnrollmentRepository } from '../../repositories/enrollment.repository';

@Injectable()
export class CreateEnrollmentUseCase {
  constructor(@Inject('EnrollmentRepository') private readonly repository: EnrollmentRepository) {}
  async execute(enrollment: Partial<Enrollment>): Promise<Enrollment> {
    return this.repository.create(enrollment);
  }
}