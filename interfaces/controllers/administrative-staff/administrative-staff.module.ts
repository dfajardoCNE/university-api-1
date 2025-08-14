import { Module } from '@nestjs/common';
import { AdministrativeStaffController } from './administrative-staff.controller';
import { AdministrativeStaffRepositoryImpl } from '../../../infrastructure/database/repositories/administrative-staff/administrative-staff.repository.impl';
import { PrismaModule } from '../../../infrastructure/database/prisma/prisma.module';
import { CreateAdministrativeStaffUseCase } from '../../../domain/use-cases/administrative-staff/create-administrative-staff.use-case';
import { UpdateAdministrativeStaffUseCase } from '../../../domain/use-cases/administrative-staff/update-administrative-staff.use-case';
import { DeleteAdministrativeStaffUseCase } from '../../../domain/use-cases/administrative-staff/delete-administrative-staff.use-case';
import { GetAllAdministrativeStaffUseCase } from '../../../domain/use-cases/administrative-staff/get-all-administrative-staff.use-case';
import { GetAdministrativeStaffByIdUseCase } from '../../../domain/use-cases/administrative-staff/get-administrative-staff-by-id.use-case';
import { GetAdministrativeStaffByDepartmentUseCase } from '../../../domain/use-cases/administrative-staff/get-administrative-staff-by-department.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [AdministrativeStaffController],
  providers: [
    {
      provide: 'AdministrativeStaffRepository',
      useClass: AdministrativeStaffRepositoryImpl,
    },
    CreateAdministrativeStaffUseCase,
    UpdateAdministrativeStaffUseCase,
    DeleteAdministrativeStaffUseCase,
    GetAllAdministrativeStaffUseCase,
    GetAdministrativeStaffByIdUseCase,
    GetAdministrativeStaffByDepartmentUseCase,
  ],
})
export class AdministrativeStaffModule {}