import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Enrollment } from '../../entities/enrollment.entity';
import { EnrollmentRepository } from '../../repositories/enrollment.repository';

@Injectable()
export class GetEnrollmentByIdUseCase {
  constructor(@Inject('EnrollmentRepository') private readonly repository: EnrollmentRepository) {}
  async execute(id: number): Promise<Enrollment> {
    const enrollment = await this.repository.findById(id);
    if (!enrollment) throw new NotFoundException('Enrollment not found');
    return enrollment;
  }
}