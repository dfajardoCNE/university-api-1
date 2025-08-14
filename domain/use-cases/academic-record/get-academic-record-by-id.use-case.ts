import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { AcademicRecord } from '../../entities/academic-record.entity';
import { AcademicRecordRepository } from '../../repositories/academic-record.repository';

@Injectable()
export class GetAcademicRecordByIdUseCase {
  constructor(@Inject('AcademicRecordRepository') private readonly recordRepository: AcademicRecordRepository) {}
  async execute(id: number): Promise<AcademicRecord> {
    const record = await this.recordRepository.findById(id);
    if (!record) {
      throw new NotFoundException('Academic record not found');
    }
    return record;
  }
}