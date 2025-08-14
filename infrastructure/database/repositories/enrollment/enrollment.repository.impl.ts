import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Enrollment } from '../../../../domain/entities/enrollment.entity';
import { EnrollmentRepository } from '../../../../domain/repositories/enrollment.repository';

@Injectable()
export class EnrollmentRepositoryImpl implements EnrollmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Enrollment[]> {
    const enrollments = await this.prisma.enrollment.findMany({
      include: {
        student: { include: { person: true } },
        term: true,
      },
      orderBy: { enrollmentDate: 'desc' },
    });
    return enrollments.map(e => this.mapToEntity(e));
  }

  async findById(id: number): Promise<Enrollment | null> {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id },
      include: {
        student: { include: { person: true } },
        term: true,
      },
    });
    return enrollment ? this.mapToEntity(enrollment) : null;
  }

  async findByStudent(studentId: number): Promise<Enrollment[]> {
    const enrollments = await this.prisma.enrollment.findMany({
      where: { studentId },
      include: {
        student: { include: { person: true } },
        term: true,
      },
      orderBy: { enrollmentDate: 'desc' },
    });
    return enrollments.map(e => this.mapToEntity(e));
  }

  async findByTerm(termId: number): Promise<Enrollment[]> {
    const enrollments = await this.prisma.enrollment.findMany({
      where: { termId },
      include: {
        student: { include: { person: true } },
        term: true,
      },
      orderBy: { enrollmentDate: 'desc' },
    });
    return enrollments.map(e => this.mapToEntity(e));
  }

  async create(enrollment: Partial<Enrollment>): Promise<Enrollment> {
    const { id, studentName, termName, createdAt, updatedAt, ...data } = enrollment;
    const created = await this.prisma.enrollment.create({
      data: data as any,
      include: {
        student: { include: { person: true } },
        term: true,
      },
    });
    return this.mapToEntity(created);
  }

  async update(id: number, enrollment: Partial<Enrollment>): Promise<Enrollment> {
    const { id: _, studentName, termName, createdAt, updatedAt, ...data } = enrollment;
    const updated = await this.prisma.enrollment.update({
      where: { id },
      data: data as any,
      include: {
        student: { include: { person: true } },
        term: true,
      },
    });
    return this.mapToEntity(updated);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.enrollment.delete({ where: { id } });
  }

  private mapToEntity(record: any): Enrollment {
    return {
      id: record.id,
      studentId: record.studentId,
      termId: record.termId,
      status: record.status,
      enrollmentDate: record.enrollmentDate,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      studentName: `${record.student?.person?.firstName ?? ''} ${record.student?.person?.lastName ?? ''}`.trim(),
      termName: record.term?.name,
    } as Enrollment;
  }
}