import { Injectable, Inject } from '@nestjs/common';
import { Enrollment } from '../../entities/enrollment.entity';
import { EnrollmentRepository } from '../../repositories/enrollment.repository';

@Injectable()
export class GetAllEnrollmentsUseCase {
  constructor(@Inject('EnrollmentRepository') private readonly repository: EnrollmentRepository) {}
  async execute(): Promise<Enrollment[]> {
    return this.repository.findAll();
  }
}