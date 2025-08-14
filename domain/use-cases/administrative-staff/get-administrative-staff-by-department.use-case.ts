import { Injectable, Inject } from '@nestjs/common';
import { AdministrativeStaff } from '../../entities/administrative-staff.entity';
import { AdministrativeStaffRepository } from '../../repositories/administrative-staff.repository';

/**
 * Use case for retrieving administrative staff members by department.
 */
@Injectable()
export class GetAdministrativeStaffByDepartmentUseCase {
  constructor(
    @Inject('AdministrativeStaffRepository')
    private readonly staffRepository: AdministrativeStaffRepository
  ) {}

  /**
   * Retrieve staff belonging to a department.
   * @param departmentId Numeric identifier of the department
   */
  async execute(departmentId: number): Promise<AdministrativeStaff[]> {
    return this.staffRepository.findByDepartment(departmentId);
  }
}