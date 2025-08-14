import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { EnrollmentRepository } from '../../repositories/enrollment.repository';

@Injectable()
export class DeleteEnrollmentUseCase {
  constructor(@Inject('EnrollmentRepository') private readonly repository: EnrollmentRepository) {}
  async execute(id: number): Promise<void> {
    const existing = await this.repository.findById(id);
    if (!existing) throw new NotFoundException('Enrollment not found');
    await this.repository.delete(id);
  }
}