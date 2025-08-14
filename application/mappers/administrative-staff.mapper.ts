import { AdministrativeStaff } from '../../domain/entities/administrative-staff.entity';
import { AdministrativeStaffResponseDto } from '../dto/administrative-staff/administrative-staff-response.dto';

/**
 * Mapper class to convert AdministrativeStaff entities into response DTOs.
 *
 * Mappers provide a dedicated location to handle transformation logic, keeping
 * controllers clean and decoupling domain entities from external
 * representations. This adheres to the Single Responsibility Principle【844773143693189†L191-L193】.
 */
export class AdministrativeStaffMapper {
  /**
   * Convert a single AdministrativeStaff entity to its corresponding response DTO.
   * @param staff AdministrativeStaff entity instance
   */
  static toResponseDto(staff: AdministrativeStaff): AdministrativeStaffResponseDto {
    return {
      id: staff.id,
      personId: staff.personId,
      departmentId: staff.departmentId,
      position: staff.position,
      hireDate: staff.hireDate,
      status: staff.status,
      createdAt: staff.createdAt,
      updatedAt: staff.updatedAt,
      firstName: staff.firstName,
      lastName: staff.lastName,
      email: staff.email,
      departmentName: staff.departmentName,
    } as AdministrativeStaffResponseDto;
  }

  /**
   * Convert an array of AdministrativeStaff entities into response DTOs.
   * @param staffList Array of AdministrativeStaff entities
   */
  static toResponseDtoArray(staffList: AdministrativeStaff[]): AdministrativeStaffResponseDto[] {
    return staffList.map(staff => this.toResponseDto(staff));
  }
}