import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AdministrativeStaff } from '../../../../domain/entities/administrative-staff.entity';
import { AdministrativeStaffRepository } from '../../../../domain/repositories/administrative-staff.repository';

/**
 * Prisma-based implementation of AdministrativeStaffRepository.
 *
 * This class converts Prisma models into domain entities by explicitly
 * mapping related fields (e.g. person and department names) and omitting
 * properties not required for persistence. Leveraging Prisma's `include`
 * feature, we ensure that the repository returns enriched entities when
 * requested. Should the underlying ORM change, this implementation could be
 * replaced without affecting higher-level modules thanks to the repository
 * abstraction【844773143693189†L191-L193】.
 */
@Injectable()
export class AdministrativeStaffRepositoryImpl implements AdministrativeStaffRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<AdministrativeStaff[]> {
    const staff = await this.prisma.administrativeStaff.findMany({
      include: {
        person: true,
        department: true,
      },
    });
    return staff.map(s => this.mapToEntity(s));
  }

  async findById(id: number): Promise<AdministrativeStaff | null> {
    const staff = await this.prisma.administrativeStaff.findUnique({
      where: { id },
      include: {
        person: true,
        department: true,
      },
    });
    return staff ? this.mapToEntity(staff) : null;
  }

  async findByDepartment(departmentId: number): Promise<AdministrativeStaff[]> {
    const staff = await this.prisma.administrativeStaff.findMany({
      where: { departmentId },
      include: {
        person: true,
        department: true,
      },
    });
    return staff.map(s => this.mapToEntity(s));
  }

  async create(staff: Partial<AdministrativeStaff>): Promise<AdministrativeStaff> {
    // Omit computed fields from the incoming data
    const { id, firstName, lastName, email, departmentName, createdAt, updatedAt, ...data } = staff;
    const created = await this.prisma.administrativeStaff.create({
      data: data as any,
      include: {
        person: true,
        department: true,
      },
    });
    return this.mapToEntity(created);
  }

  async update(id: number, staff: Partial<AdministrativeStaff>): Promise<AdministrativeStaff> {
    const { id: _, firstName, lastName, email, departmentName, createdAt, updatedAt, ...data } = staff;
    const updated = await this.prisma.administrativeStaff.update({
      where: { id },
      data: data as any,
      include: {
        person: true,
        department: true,
      },
    });
    return this.mapToEntity(updated);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.administrativeStaff.delete({
      where: { id },
    });
  }

  /**
   * Helper method to map a Prisma AdministrativeStaff record to a domain entity.
   */
  private mapToEntity(record: any): AdministrativeStaff {
    return {
      id: record.id,
      personId: record.personId,
      departmentId: record.departmentId,
      position: record.position,
      hireDate: record.hireDate,
      status: record.status,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      firstName: record.person?.firstName,
      lastName: record.person?.lastName,
      email: record.person?.email,
      departmentName: record.department?.name,
    } as AdministrativeStaff;
  }
}