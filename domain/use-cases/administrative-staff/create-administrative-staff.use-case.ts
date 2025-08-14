import { Injectable, Inject } from '@nestjs/common';
import { AdministrativeStaff } from '../../entities/administrative-staff.entity';
import { AdministrativeStaffRepository } from '../../repositories/administrative-staff.repository';

/**
 * Use case for creating a new administrative staff member.
 *
 * This class encapsulates the business rules for registering a new staff member
 * and delegates the persistence to the repository. Keeping the logic in a
 * dedicated use case helps maintain a clear separation of concerns and makes
 * the application easier to test and maintain【844773143693189†L191-L193】.
 */
@Injectable()
export class CreateAdministrativeStaffUseCase {
  constructor(
    @Inject('AdministrativeStaffRepository')
    private readonly staffRepository: AdministrativeStaffRepository
  ) {}

  /**
   * Execute the creation of an administrative staff record.
   * @param staffData Partial data required to create the staff member
   */
  async execute(staffData: Partial<AdministrativeStaff>): Promise<AdministrativeStaff> {
    return this.staffRepository.create(staffData);
  }
}