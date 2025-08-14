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
    const studyPlans = await this.prisma.studyPlan.findMany({
      include: {
        courses: true,
      },
    });
    
    // Map the Prisma model to the domain entity
    return studyPlans.map(plan => ({
      ...plan,
      planCourses: plan.courses,
    })) as unknown as StudyPlan[];
  }

  async findById(id: number): Promise<StudyPlan | null> {
    const studyPlan = await this.prisma.studyPlan.findUnique({
      where: { id },
      include: {
        courses: true,
        career: true,
      },
    });
    
    if (!studyPlan) return null;
    
    // Map the Prisma model to the domain entity
    return {
      ...studyPlan,
      planCourses: studyPlan.courses,
    } as unknown as StudyPlan;
  }

  async findByCareer(careerId: number): Promise<StudyPlan[]> {
    const studyPlans = await this.prisma.studyPlan.findMany({
      where: { careerId },
      include: {
        courses: true,
      },
    });
    
    // Map the Prisma model to the domain entity
    return studyPlans.map(plan => ({
      ...plan,
      planCourses: plan.courses,
    })) as unknown as StudyPlan[];
  }

  async create(data: Partial<StudyPlan>): Promise<StudyPlan> {
    const { planCourses, ...studyPlanData } = data;
    // Create StudyPlan along with related courses if provided
    const createdPlan = await this.prisma.studyPlan.create({
      data: {
        ...(studyPlanData as any),
        courses: planCourses
          ? {
              create: planCourses.map((pc: any) => ({
                courseId: pc.courseId,
                semester: pc.termNumber, // Map termNumber to semester field
              })),
            }
          : undefined,
      },
      include: {
        courses: true,
        career: true,
      },
    });
    
    // Map the Prisma model to the domain entity
    return {
      ...createdPlan,
      planCourses: createdPlan.courses,
    } as unknown as StudyPlan;
  }

  async update(id: number, data: Partial<StudyPlan>): Promise<StudyPlan> {
    const { planCourses, ...studyPlanData } = data;
    // Update StudyPlan; if planCourses provided, replace all existing
    const updatedPlan = await this.prisma.studyPlan.update({
      where: { id },
      data: {
        ...(studyPlanData as any),
        courses: planCourses
          ? {
              deleteMany: {},
              create: planCourses.map((pc: any) => ({
                courseId: pc.courseId,
                semester: pc.termNumber, // Map termNumber to semester field
              })),
            }
          : undefined,
      },
      include: {
        courses: true,
        career: true,
      },
    });
    
    // Map the Prisma model to the domain entity
    return {
      ...updatedPlan,
      planCourses: updatedPlan.courses,
    } as unknown as StudyPlan;
  }

  async delete(id: number): Promise<void> {
    await this.prisma.studyPlan.delete({
      where: { id },
    });
  }
}