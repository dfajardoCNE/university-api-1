import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { AcademicRecord } from '../../entities/academic-record.entity';
import { AcademicRecordRepository } from '../../repositories/academic-record.repository';

@Injectable()
export class UpdateAcademicRecordUseCase {
  constructor(@Inject('AcademicRecordRepository') private readonly recordRepository: AcademicRecordRepository) {}
  async execute(id: number, recordData: Partial<AcademicRecord>): Promise<AcademicRecord> {
    const existing = await this.recordRepository.findById(id);
    if (!existing) {
      throw new NotFoundException('Academic record not found');
    }
    return this.recordRepository.update(id, recordData);
  }
}