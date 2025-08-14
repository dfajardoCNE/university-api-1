import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Practice } from '../../../../domain/entities/practice.entity';
import { PracticeRepository } from '../../../../domain/repositories/practice.repository';

@Injectable()
export class PracticeRepositoryImpl implements PracticeRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Practice[]> {
    const practices = await this.prisma.practice.findMany({
      include: {
        course: true,
        professor: true,
      },
    });

    // Map Prisma model to domain entity
    return practices.map(practice => ({
      ...practice,
      professorId: practice.professor?.id || 0,
      weight: practice.maxScore || 100,
    }));
  }

  async findById(id: number): Promise<Practice> {
    const practice = await this.prisma.practice.findUnique({
      where: { id },
      include: {
        course: true,
        professor: true,
      },
    });

    if (!practice) return null;

    // Map Prisma model to domain entity
    return {
      ...practice,
      professorId: practice.professor?.id || 0,
      weight: practice.maxScore || 100,
    };
  }

  async findByCourse(courseId: number): Promise<Practice[]> {
    const practices = await this.prisma.practice.findMany({
      where: { courseId },
      include: {
        professor: true,
      },
    });

    // Map Prisma model to domain entity
    return practices.map(practice => ({
      ...practice,
      professorId: practice.professor?.id || 0,
      weight: practice.maxScore || 100,
    }));
  }

  async findByProfessor(professorId: number): Promise<Practice[]> {
    const practices = await this.prisma.practice.findMany({
      where: { professorId },
      include: {
        course: true,
      },
    });

    // Map Prisma model to domain entity
    return practices.map(practice => ({
      ...practice,
      professorId,
      weight: practice.maxScore || 100,
    }));
  }

  async create(practice: Partial<Practice>): Promise<Practice> {
    const { id, weight, ...data } = practice;
    const created = await this.prisma.practice.create({
      data: data as any, // Using type assertion to bypass type checking
      include: {
        course: true,
        professor: true,
      },
    });

    return created ? {
      ...created,
      professorId: practice.professorId || 0,
      weight: weight || 100,
    } : null;
  }

  async update(id: number, practice: Partial<Practice>): Promise<Practice> {
    const { id: _, weight, ...data } = practice;
    const updated = await this.prisma.practice.update({
      where: { id },
      data: data as any, // Using type assertion to bypass type checking
      include: {
        course: true,
        professor: true,
      },
    });

    return updated ? {
      ...updated,
      professorId: practice.professorId || 0,
      weight: updated.maxScore || 100,
    } : null;
  }

  async delete(id: number): Promise<void> {
    await this.prisma.practice.delete({
      where: { id },
    });
  }
}
