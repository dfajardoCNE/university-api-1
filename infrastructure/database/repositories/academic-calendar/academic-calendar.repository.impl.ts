import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AcademicCalendar } from '../../../../domain/entities/academic-calendar.entity';
import { AcademicCalendarRepository } from '../../../../domain/repositories/academic-calendar.repository';

@Injectable()
export class AcademicCalendarRepositoryImpl implements AcademicCalendarRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<AcademicCalendar[]> {
    const events = await this.prisma.academicCalendar.findMany({
      orderBy: { startDate: 'asc' },
    });
    return events.map(e => this.mapToEntity(e));
  }

  async findById(id: number): Promise<AcademicCalendar | null> {
    const event = await this.prisma.academicCalendar.findUnique({ where: { id } });
    return event ? this.mapToEntity(event) : null;
  }

  async findByDateRange(start: Date, end: Date): Promise<AcademicCalendar[]> {
    const events = await this.prisma.academicCalendar.findMany({
      where: {
        OR: [
          {
            startDate: {
              gte: start,
              lte: end,
            },
          },
          {
            endDate: {
              gte: start,
              lte: end,
            },
          },
        ],
      },
      orderBy: { startDate: 'asc' },
    });
    return events.map(e => this.mapToEntity(e));
  }

  async create(event: Partial<AcademicCalendar>): Promise<AcademicCalendar> {
    const { id, createdAt, updatedAt, ...data } = event;
    const created = await this.prisma.academicCalendar.create({ data: data as any });
    return this.mapToEntity(created);
  }

  async update(id: number, event: Partial<AcademicCalendar>): Promise<AcademicCalendar> {
    const { id: _, createdAt, updatedAt, ...data } = event;
    const updated = await this.prisma.academicCalendar.update({ where: { id }, data: data as any });
    return this.mapToEntity(updated);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.academicCalendar.delete({ where: { id } });
  }

  private mapToEntity(record: any): AcademicCalendar {
    return {
      id: record.id,
      title: record.title,
      description: record.description ?? undefined,
      startDate: record.startDate,
      endDate: record.endDate,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    } as AcademicCalendar;
  }
}