import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { StudyPlanRepository } from '../../../../domain/repositories/study-plan.repository';
import { StudyPlan } from '../../../../domain/entities/study-plan.entity';

/**
 * Implementación del repositorio de Planes de Estudio utilizando Prisma. Este
 * repositorio expone métodos CRUD y permite filtrar planes por carrera.
 * También incluye la relación con los cursos del plan mediante la tabla
 * intermedia StudyPlanCourse.
 */
@Injectable()
export class StudyPlanRepositoryImpl implements StudyPlanRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<StudyPlan[]> {
    return this.prisma.studyPlan.findMany({
      include: {
        planCourses: true,
      },
    }) as unknown as StudyPlan[];
  }

  async findById(id: number): Promise<StudyPlan | null> {
    return (await this.prisma.studyPlan.findUnique({
      where: { id },
      include: {
        planCourses: true,
      },
    })) as unknown as StudyPlan;
  }

  async findByCareer(careerId: number): Promise<StudyPlan[]> {
    return (await this.prisma.studyPlan.findMany({
      where: { careerId },
      include: {
        planCourses: true,
      },
    })) as unknown as StudyPlan[];
  }

  async create(data: Partial<StudyPlan>): Promise<StudyPlan> {
    const { planCourses, ...studyPlanData } = data;
    // Create StudyPlan along with related courses if provided
    return (await this.prisma.studyPlan.create({
      data: {
        ...(studyPlanData as any),
        planCourses: planCourses
          ? {
              create: planCourses.map((pc: any) => ({
                courseId: pc.courseId,
                termNumber: pc.termNumber,
              })),
            }
          : undefined,
      },
      include: {
        planCourses: true,
      },
    })) as unknown as StudyPlan;
  }

  async update(id: number, data: Partial<StudyPlan>): Promise<StudyPlan> {
    const { planCourses, ...studyPlanData } = data;
    // Update StudyPlan; if planCourses provided, replace all existing
    return (await this.prisma.studyPlan.update({
      where: { id },
      data: {
        ...(studyPlanData as any),
        planCourses: planCourses
          ? {
              deleteMany: {},
              create: planCourses.map((pc: any) => ({
                courseId: pc.courseId,
                termNumber: pc.termNumber,
              })),
            }
          : undefined,
      },
      include: {
        planCourses: true,
      },
    })) as unknown as StudyPlan;
  }

  async delete(id: number): Promise<void> {
    await this.prisma.studyPlan.delete({
      where: { id },
    });
  }
}