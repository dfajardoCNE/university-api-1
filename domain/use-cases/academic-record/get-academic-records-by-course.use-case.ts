import { Injectable, Inject } from '@nestjs/common';
import { AcademicRecord } from '../../entities/academic-record.entity';
import { AcademicRecordRepository } from '../../repositories/academic-record.repository';

@Injectable()
export class GetAcademicRecordsByCourseUseCase {
  constructor(@Inject('AcademicRecordRepository') private readonly recordRepository: AcademicRecordRepository) {}
  async execute(courseId: number): Promise<AcademicRecord[]> {
    return this.recordRepository.findByCourse(courseId);
  }
}