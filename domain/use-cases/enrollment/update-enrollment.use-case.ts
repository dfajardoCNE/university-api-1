import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Enrollment } from '../../entities/enrollment.entity';
import { EnrollmentRepository } from '../../repositories/enrollment.repository';

@Injectable()
export class UpdateEnrollmentUseCase {
  constructor(@Inject('EnrollmentRepository') private readonly repository: EnrollmentRepository) {}
  async execute(id: number, enrollment: Partial<Enrollment>): Promise<Enrollment> {
    const existing = await this.repository.findById(id);
    if (!existing) throw new NotFoundException('Enrollment not found');
    return this.repository.update(id, enrollment);
  }
}