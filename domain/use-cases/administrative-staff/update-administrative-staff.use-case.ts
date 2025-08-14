import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { AdministrativeStaff } from '../../entities/administrative-staff.entity';
import { AdministrativeStaffRepository } from '../../repositories/administrative-staff.repository';

/**
 * Use case for updating an existing administrative staff member.
 */
@Injectable()
export class UpdateAdministrativeStaffUseCase {
  constructor(
    @Inject('AdministrativeStaffRepository')
    private readonly staffRepository: AdministrativeStaffRepository
  ) {}

  /**
   * Execute the update operation.
   *
   * If the staff member does not exist, a NotFoundException is thrown to
   * indicate the requested resource is missing. This ensures controllers
   * translate domain-specific errors into appropriate HTTP responses.
   *
   * @param id Numeric identifier of the staff member
   * @param staffData Partial data to update
   */
  async execute(id: number, staffData: Partial<AdministrativeStaff>): Promise<AdministrativeStaff> {
    const existing = await this.staffRepository.findById(id);
    if (!existing) {
      throw new NotFoundException('Administrative staff not found');
    }
    return this.staffRepository.update(id, staffData);
  }
}