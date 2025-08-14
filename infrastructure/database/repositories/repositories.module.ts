import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UserRepositoryImpl } from './user/user.repository.impl';
import { StudentRepositoryImpl } from './student/student.repository.impl';
import { StudentAcademicRepositoryImpl } from './student/student-academic.repository.impl';
import { StudentSectionRepositoryImpl } from './student-section/student-section.repository.impl';
import { CourseRepositoryImpl } from './course/course.repository.impl';
import { InvoiceRepositoryImpl } from './invoice/invoice.repository.impl';
import { ProfessorRepositoryImpl } from './professor/professor.repository.impl';
import { SectionRepositoryImpl } from './section/section.repository.impl';
import { ExamRepositoryImpl } from './exam/exam.repository.impl';
import { PaymentRepositoryImpl } from './payment/payment.repository.impl';
import { AdministrativeStaffRepositoryImpl } from './administrative-staff/administrative-staff.repository.impl';
import { AcademicRecordRepositoryImpl } from './academic-record/academic-record.repository.impl';
import { AcademicCalendarRepositoryImpl } from './academic-calendar/academic-calendar.repository.impl';
import { EnrollmentRepositoryImpl } from './enrollment/enrollment.repository.impl';
import { StudyPlanRepositoryImpl } from './study-plan/study-plan.repository.impl';
import { AnalyticsRepositoryImpl } from './analytics/analytics.repository.impl';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: 'UserRepository',
      useClass: UserRepositoryImpl,
    },
    {
      provide: 'StudentRepository',
      useClass: StudentRepositoryImpl,
    },
    {
      provide: 'StudentAcademicRepository',
      useClass: StudentAcademicRepositoryImpl,
    },
    {
      provide: 'StudentSectionRepository',
      useClass: StudentSectionRepositoryImpl,
    },
    {
      provide: 'CourseRepository',
      useClass: CourseRepositoryImpl,
    },
    {
      provide: 'InvoiceRepository',
      useClass: InvoiceRepositoryImpl,
    },
    {
      provide: 'ProfessorRepository',
      useClass: ProfessorRepositoryImpl,
    },
    {
      provide: 'SectionRepository',
      useClass: SectionRepositoryImpl,
    },
    {
      provide: 'ExamRepository',
      useClass: ExamRepositoryImpl,
    },
    {
      provide: 'PaymentRepository',
      useClass: PaymentRepositoryImpl,
    },
    {
      provide: 'AdministrativeStaffRepository',
      useClass: AdministrativeStaffRepositoryImpl,
    },
    {
      provide: 'AcademicRecordRepository',
      useClass: AcademicRecordRepositoryImpl,
    },
    {
      provide: 'AcademicCalendarRepository',
      useClass: AcademicCalendarRepositoryImpl,
    },
    {
      provide: 'EnrollmentRepository',
      useClass: EnrollmentRepositoryImpl,
    },
    {
      provide: 'StudyPlanRepository',
      useClass: StudyPlanRepositoryImpl,
    },
    {
      provide: 'AnalyticsRepository',
      useClass: AnalyticsRepositoryImpl,
    },
  ],
  exports: [
    'UserRepository',
    'StudentRepository',
    'StudentAcademicRepository',
    'StudentSectionRepository',
    'CourseRepository',
    'InvoiceRepository',
    'ProfessorRepository',
    'SectionRepository',
    'ExamRepository',
    'PaymentRepository',
    'AdministrativeStaffRepository',
    'AcademicRecordRepository',
    'AcademicCalendarRepository',
    'EnrollmentRepository',
    'StudyPlanRepository',
    'AnalyticsRepository',
  ],
})
export class RepositoriesModule {}