import { AdministrativeStaff } from '../entities/administrative-staff.entity';

/**
 * Repository contract for interacting with the administrative staff data source.
 *
 * Following the Dependency Inversion Principle, higher-level modules depend on
 * this abstraction rather than a concrete implementation. Infrastructure
 * implementations (e.g. Prisma, TypeORM) will implement this interface to
 * perform actual database operations. See the repository pattern for more
 * details【844773143693189†L191-L193】.
 */
export interface AdministrativeStaffRepository {
  /**
   * Retrieve all administrative staff records.
   */
  findAll(): Promise<AdministrativeStaff[]>;

  /**
   * Retrieve a staff member by its unique identifier.
   * @param id Numeric identifier of the staff member
   */
  findById(id: number): Promise<AdministrativeStaff | null>;

  /**
   * Retrieve staff members belonging to a specific department.
   * @param departmentId Numeric identifier of the department
   */
  findByDepartment(departmentId: number): Promise<AdministrativeStaff[]>;

  /**
   * Persist a new administrative staff record.
   * @param staff Partial data to create the staff member
   */
  create(staff: Partial<AdministrativeStaff>): Promise<AdministrativeStaff>;

  /**
   * Update an existing administrative staff record.
   * @param id Numeric identifier of the staff member
   * @param staff Partial data with fields to update
   */
  update(id: number, staff: Partial<AdministrativeStaff>): Promise<AdministrativeStaff>;

  /**
   * Remove an administrative staff record.
   * @param id Numeric identifier of the staff member
   */
  delete(id: number): Promise<void>;
}