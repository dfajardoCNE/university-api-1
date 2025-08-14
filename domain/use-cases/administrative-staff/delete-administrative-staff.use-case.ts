import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { AdministrativeStaffRepository } from '../../repositories/administrative-staff.repository';

/**
 * Use case for removing an administrative staff member.
 */
@Injectable()
export class DeleteAdministrativeStaffUseCase {
  constructor(
    @Inject('AdministrativeStaffRepository')
    private readonly staffRepository: AdministrativeStaffRepository
  ) {}

  /**
   * Remove a staff member by ID. Throws NotFoundException if not found.
   * @param id Numeric identifier of the staff member
   */
  async execute(id: number): Promise<void> {
    const existing = await this.staffRepository.findById(id);
    if (!existing) {
      throw new NotFoundException('Administrative staff not found');
    }
    await this.staffRepository.delete(id);
  }
}