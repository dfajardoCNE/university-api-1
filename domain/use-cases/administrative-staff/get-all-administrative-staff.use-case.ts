import { Injectable, Inject } from '@nestjs/common';
import { AdministrativeStaff } from '../../entities/administrative-staff.entity';
import { AdministrativeStaffRepository } from '../../repositories/administrative-staff.repository';

/**
 * Use case for retrieving all administrative staff members.
 */
@Injectable()
export class GetAllAdministrativeStaffUseCase {
  constructor(
    @Inject('AdministrativeStaffRepository')
    private readonly staffRepository: AdministrativeStaffRepository
  ) {}

  /**
   * Execute retrieval of all staff.
   */
  async execute(): Promise<AdministrativeStaff[]> {
    return this.staffRepository.findAll();
  }
}