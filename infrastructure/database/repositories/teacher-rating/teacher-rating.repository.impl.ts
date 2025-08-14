import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TeacherRating } from '../../../../domain/entities/teacher-rating.entity';
import { TeacherRatingRepository } from '../../../../domain/repositories/teacher-rating.repository';

@Injectable()
export class TeacherRatingRepositoryImpl implements TeacherRatingRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<TeacherRating[]> {
    const ratings = await this.prisma.teacherRating.findMany({
      include: {
        professor: {
          include: {
            person: true,
          },
        },
        student: {
          include: {
            person: true,
          },
        },
      },
    });
    
    return ratings.map(rating => ({
      id: rating.id,
      studentId: rating.studentId,
      professorId: rating.professorId,
      rating: rating.rating,
      comment: rating.comment || undefined,
      createdAt: rating.createdAt
    }));
  }

  async findById(id: number): Promise<TeacherRating> {
    const rating = await this.prisma.teacherRating.findUnique({
      where: { id },
      include: {
        professor: {
          include: {
            person: true,
          },
        },
        student: {
          include: {
            person: true,
          },
        },
      },
    });
    
    if (!rating) return null;
    
    return {
      id: rating.id,
      studentId: rating.studentId,
      professorId: rating.professorId,
      rating: rating.rating,
      comment: rating.comment || undefined,
      createdAt: rating.createdAt
    };
  }

  async findByProfessor(professorId: number): Promise<TeacherRating[]> {
    const ratings = await this.prisma.teacherRating.findMany({
      where: { professorId },
      include: {
        student: {
          include: {
            person: true,
          },
        },
      },
    });
    
    return ratings.map(rating => ({
      id: rating.id,
      studentId: rating.studentId,
      professorId: rating.professorId,
      rating: rating.rating,
      comment: rating.comment || undefined,
      createdAt: rating.createdAt
    }));
  }

  async findByStudent(studentId: number): Promise<TeacherRating[]> {
    const ratings = await this.prisma.teacherRating.findMany({
      where: { studentId },
      include: {
        professor: {
          include: {
            person: true,
          },
        },
      },
    });
    
    return ratings.map(rating => ({
      id: rating.id,
      studentId: rating.studentId,
      professorId: rating.professorId,
      rating: rating.rating,
      comment: rating.comment || undefined,
      createdAt: rating.createdAt
    }));
  }

  async create(rating: Partial<TeacherRating>): Promise<TeacherRating> {
    const { id, ...data } = rating;
    const created = await this.prisma.teacherRating.create({
      data: {
        studentId: data.studentId,
        professorId: data.professorId,
        userId: data.studentId, // Using studentId as userId for now
        rating: data.rating,
        comment: data.comment,
      },
      include: {
        student: {
          include: {
            person: true,
          },
        },
        professor: {
          include: {
            person: true,
          },
        },
      },
    });
    
    return {
      id: created.id,
      studentId: created.studentId,
      professorId: created.professorId,
      rating: created.rating,
      comment: created.comment || undefined,
      createdAt: created.createdAt
    };
  }

  async update(id: number, rating: Partial<TeacherRating>): Promise<TeacherRating> {
    const { id: _, ...data } = rating;
    const updated = await this.prisma.teacherRating.update({
      where: { id },
      data: {
        studentId: data.studentId,
        professorId: data.professorId,
        userId: data.studentId, // Using studentId as userId for now
        rating: data.rating,
        comment: data.comment,
      },
      include: {
        student: {
          include: {
            person: true,
          },
        },
        professor: {
          include: {
            person: true,
          },
        },
      },
    });
    
    return {
      id: updated.id,
      studentId: updated.studentId,
      professorId: updated.professorId,
      rating: updated.rating,
      comment: updated.comment || undefined,
      createdAt: updated.createdAt
    };
  }

  async delete(id: number): Promise<void> {
    await this.prisma.teacherRating.delete({
      where: { id },
    });
  }
}
