import { Injectable, Inject } from '@nestjs/common';
import { AcademicRecord } from '../../entities/academic-record.entity';
import { AcademicRecordRepository } from '../../repositories/academic-record.repository';

@Injectable()
export class CreateAcademicRecordUseCase {
  constructor(@Inject('AcademicRecordRepository') private readonly recordRepository: AcademicRecordRepository) {}
  async execute(recordData: Partial<AcademicRecord>): Promise<AcademicRecord> {
    return this.recordRepository.create(recordData);
  }
}