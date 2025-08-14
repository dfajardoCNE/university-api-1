import { Module } from '@nestjs/common';
import { AcademicCalendarController } from './academic-calendar.controller';
import { AcademicCalendarRepositoryImpl } from '../../../infrastructure/database/repositories/academic-calendar/academic-calendar.repository.impl';
import { PrismaModule } from '../../../infrastructure/database/prisma/prisma.module';
import { CreateAcademicCalendarUseCase } from '../../../domain/use-cases/academic-calendar/create-academic-calendar.use-case';
import { UpdateAcademicCalendarUseCase } from '../../../domain/use-cases/academic-calendar/update-academic-calendar.use-case';
import { DeleteAcademicCalendarUseCase } from '../../../domain/use-cases/academic-calendar/delete-academic-calendar.use-case';
import { GetAllAcademicCalendarUseCase } from '../../../domain/use-cases/academic-calendar/get-all-academic-calendar.use-case';
import { GetAcademicCalendarByIdUseCase } from '../../../domain/use-cases/academic-calendar/get-academic-calendar-by-id.use-case';
import { GetAcademicCalendarByDateRangeUseCase } from '../../../domain/use-cases/academic-calendar/get-academic-calendar-by-date-range.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [AcademicCalendarController],
  providers: [
    {
      provide: 'AcademicCalendarRepository',
      useClass: AcademicCalendarRepositoryImpl,
    },
    CreateAcademicCalendarUseCase,
    UpdateAcademicCalendarUseCase,
    DeleteAcademicCalendarUseCase,
    GetAllAcademicCalendarUseCase,
    GetAcademicCalendarByIdUseCase,
    GetAcademicCalendarByDateRangeUseCase,
  ],
})
export class AcademicCalendarModule {}