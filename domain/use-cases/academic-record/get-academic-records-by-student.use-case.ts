import { Injectable, Inject } from '@nestjs/common';
import { AcademicRecord } from '../../entities/academic-record.entity';
import { AcademicRecordRepository } from '../../repositories/academic-record.repository';

@Injectable()
export class GetAcademicRecordsByStudentUseCase {
  constructor(@Inject('AcademicRecordRepository') private readonly recordRepository: AcademicRecordRepository) {}
  async execute(studentId: number): Promise<AcademicRecord[]> {
    return this.recordRepository.findByStudent(studentId);
  }
}