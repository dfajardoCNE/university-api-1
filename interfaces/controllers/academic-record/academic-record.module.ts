import { Module } from '@nestjs/common';
import { AcademicRecordController } from './academic-record.controller';
import { AcademicRecordRepositoryImpl } from '../../../infrastructure/database/repositories/academic-record/academic-record.repository.impl';
import { PrismaModule } from '../../../infrastructure/database/prisma/prisma.module';
import { CreateAcademicRecordUseCase } from '../../../domain/use-cases/academic-record/create-academic-record.use-case';
import { UpdateAcademicRecordUseCase } from '../../../domain/use-cases/academic-record/update-academic-record.use-case';
import { DeleteAcademicRecordUseCase } from '../../../domain/use-cases/academic-record/delete-academic-record.use-case';
import { GetAllAcademicRecordsUseCase } from '../../../domain/use-cases/academic-record/get-all-academic-records.use-case';
import { GetAcademicRecordByIdUseCase } from '../../../domain/use-cases/academic-record/get-academic-record-by-id.use-case';
import { GetAcademicRecordsByStudentUseCase } from '../../../domain/use-cases/academic-record/get-academic-records-by-student.use-case';
import { GetAcademicRecordsByCourseUseCase } from '../../../domain/use-cases/academic-record/get-academic-records-by-course.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [AcademicRecordController],
  providers: [
    {
      provide: 'AcademicRecordRepository',
      useClass: AcademicRecordRepositoryImpl,
    },
    CreateAcademicRecordUseCase,
    UpdateAcademicRecordUseCase,
    DeleteAcademicRecordUseCase,
    GetAllAcademicRecordsUseCase,
    GetAcademicRecordByIdUseCase,
    GetAcademicRecordsByStudentUseCase,
    GetAcademicRecordsByCourseUseCase,
  ],
})
export class AcademicRecordModule {}