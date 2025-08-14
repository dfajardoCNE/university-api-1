import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AcademicRecord } from '../../../../domain/entities/academic-record.entity';
import { AcademicRecordRepository } from '../../../../domain/repositories/academic-record.repository';

@Injectable()
export class AcademicRecordRepositoryImpl implements AcademicRecordRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<AcademicRecord[]> {
    const records = await this.prisma.academicRecord.findMany({
      include: {
        student: { include: { person: true } },
        course: true,
        term: true,
      },
    });
    return records.map(r => this.mapToEntity(r));
  }

  async findById(id: number): Promise<AcademicRecord | null> {
    const record = await this.prisma.academicRecord.findUnique({
      where: { id },
      include: {
        student: { include: { person: true } },
        course: true,
        term: true,
      },
    });
    return record ? this.mapToEntity(record) : null;
  }

  async findByStudent(studentId: number): Promise<AcademicRecord[]> {
    const records = await this.prisma.academicRecord.findMany({
      where: { studentId },
      include: {
        student: { include: { person: true } },
        course: true,
        term: true,
      },
    });
    return records.map(r => this.mapToEntity(r));
  }

  async findByCourse(courseId: number): Promise<AcademicRecord[]> {
    const records = await this.prisma.academicRecord.findMany({
      where: { courseId },
      include: {
        student: { include: { person: true } },
        course: true,
        term: true,
      },
    });
    return records.map(r => this.mapToEntity(r));
  }

  async create(record: Partial<AcademicRecord>): Promise<AcademicRecord> {
    const { id, studentName, courseName, termName, createdAt, updatedAt, ...data } = record;
    const created = await this.prisma.academicRecord.create({
      data: data as any,
      include: {
        student: { include: { person: true } },
        course: true,
        term: true,
      },
    });
    return this.mapToEntity(created);
  }

  async update(id: number, record: Partial<AcademicRecord>): Promise<AcademicRecord> {
    const { id: _, studentName, courseName, termName, createdAt, updatedAt, ...data } = record;
    const updated = await this.prisma.academicRecord.update({
      where: { id },
      data: data as any,
      include: {
        student: { include: { person: true } },
        course: true,
        term: true,
      },
    });
    return this.mapToEntity(updated);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.academicRecord.delete({ where: { id } });
  }

  private mapToEntity(record: any): AcademicRecord {
    return {
      id: record.id,
      studentId: record.studentId,
      courseId: record.courseId,
      termId: record.termId,
      grade: record.grade,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      studentName: `${record.student?.person?.firstName ?? ''} ${record.student?.person?.lastName ?? ''}`.trim(),
      courseName: record.course?.name,
      termName: record.term?.name,
    } as AcademicRecord;
  }
}