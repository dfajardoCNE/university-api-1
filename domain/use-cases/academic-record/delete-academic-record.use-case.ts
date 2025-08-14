import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { AcademicRecordRepository } from '../../repositories/academic-record.repository';

@Injectable()
export class DeleteAcademicRecordUseCase {
  constructor(@Inject('AcademicRecordRepository') private readonly recordRepository: AcademicRecordRepository) {}
  async execute(id: number): Promise<void> {
    const existing = await this.recordRepository.findById(id);
    if (!existing) {
      throw new NotFoundException('Academic record not found');
    }
    await this.recordRepository.delete(id);
  }
}