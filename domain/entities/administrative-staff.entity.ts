/**
 * Domain entity representing a member of the administrative staff within the university.
 *
 * This entity mirrors the structure of the `AdministrativeStaff` model defined in the
 * Prisma schema. It does not contain any business logic; instead, it holds the
 * properties that describe an administrative staff record. Optional fields are
 * included to support richer responses when joining with related tables (for
 * example, when fetching the associated person or department names). Keeping
 * entities as simple data structures adheres to the Single Responsibility
 * Principle, ensuring that business logic is kept in services or use cases【844773143693189†L191-L193】.
 */
export class AdministrativeStaff {
  /**
   * Unique identifier for the administrative staff member.
   */
  id: number;

  /**
   * Foreign key referencing the associated person (from the `Person` table).
   */
  personId: number;

  /**
   * Foreign key referencing the department to which this staff member belongs.
   */
  departmentId: number;

  /**
   * The position or job title of the staff member (e.g. Registrar, Accountant).
   */
  position: string;

  /**
   * Date on which the staff member was hired.
   */
  hireDate: Date;

  /**
   * Current employment status (e.g. active, inactive).
   */
  status: string;

  /**
   * Timestamp indicating when this record was created.
   */
  createdAt: Date;

  /**
   * Timestamp indicating when this record was last updated.
   */
  updatedAt: Date;

  // ----- Optional fields for extended queries -----
  /**
   * First name of the associated person. Populated when joining with `Person`.
   */
  firstName?: string;

  /**
   * Last name of the associated person. Populated when joining with `Person`.
   */
  lastName?: string;

  /**
   * Email of the associated person. Populated when joining with `Person`.
   */
  email?: string;

  /**
   * Name of the department. Populated when joining with `Department`.
   */
  departmentName?: string;
}