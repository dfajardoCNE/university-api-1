import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { AdministrativeStaff } from '../../entities/administrative-staff.entity';
import { AdministrativeStaffRepository } from '../../repositories/administrative-staff.repository';

/**
 * Use case for retrieving a single administrative staff member by ID.
 */
@Injectable()
export class GetAdministrativeStaffByIdUseCase {
  constructor(
    @Inject('AdministrativeStaffRepository')
    private readonly staffRepository: AdministrativeStaffRepository
  ) {}

  /**
   * Retrieve a staff member by ID. Throws NotFoundException if not found.
   * @param id Numeric identifier of the staff member
   */
  async execute(id: number): Promise<AdministrativeStaff> {
    const staff = await this.staffRepository.findById(id);
    if (!staff) {
      throw new NotFoundException('Administrative staff not found');
    }
    return staff;
  }
}