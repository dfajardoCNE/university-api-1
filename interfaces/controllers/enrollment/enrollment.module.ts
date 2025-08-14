import { Module } from '@nestjs/common';
import { EnrollmentController } from './enrollment.controller';
import { EnrollmentRepositoryImpl } from '../../../infrastructure/database/repositories/enrollment/enrollment.repository.impl';
import { PrismaModule } from '../../../infrastructure/database/prisma/prisma.module';
import { CreateEnrollmentUseCase } from '../../../domain/use-cases/enrollment/create-enrollment.use-case';
import { UpdateEnrollmentUseCase } from '../../../domain/use-cases/enrollment/update-enrollment.use-case';
import { DeleteEnrollmentUseCase } from '../../../domain/use-cases/enrollment/delete-enrollment.use-case';
import { GetAllEnrollmentsUseCase } from '../../../domain/use-cases/enrollment/get-all-enrollments.use-case';
import { GetEnrollmentByIdUseCase } from '../../../domain/use-cases/enrollment/get-enrollment-by-id.use-case';
import { GetEnrollmentsByStudentUseCase } from '../../../domain/use-cases/enrollment/get-enrollments-by-student.use-case';
import { GetEnrollmentsByTermUseCase } from '../../../domain/use-cases/enrollment/get-enrollments-by-term.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [EnrollmentController],
  providers: [
    {
      provide: 'EnrollmentRepository',
      useClass: EnrollmentRepositoryImpl,
    },
    CreateEnrollmentUseCase,
    UpdateEnrollmentUseCase,
    DeleteEnrollmentUseCase,
    GetAllEnrollmentsUseCase,
    GetEnrollmentByIdUseCase,
    GetEnrollmentsByStudentUseCase,
    GetEnrollmentsByTermUseCase,
  ],
})
export class EnrollmentModule {}