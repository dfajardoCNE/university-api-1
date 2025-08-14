import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Student } from '../../../../domain/entities/student.entity';
import { StudentRepository } from '../../../../domain/repositories/student.repository';

@Injectable()
export class StudentRepositoryImpl implements StudentRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Student[]> {
    const students = await this.prisma.student.findMany({
      include: {
        person: true,
        career: true,
        campus: true,
      },
    });
    
    return students.map(student => ({
      ...student,
      academicStatus: student.status, // Map status to academicStatus
      gpa: 0.0 // Default GPA value
    }));
  }

  async findById(id: number): Promise<Student> {
    const student = await this.prisma.student.findUnique({
      where: { id },
      include: {
        person: true,
        career: true,
        campus: true,
      },
    });
    
    if (!student) return null;
    
    return {
      ...student,
      academicStatus: student.status, // Map status to academicStatus
      gpa: 0.0 // Default GPA value
    };
  }

  async findByPerson(personId: number): Promise<Student> {
    const student = await this.prisma.student.findUnique({
      where: { personId },
      include: {
        person: true,
        career: true,
        campus: true,
      },
    });
    
    if (!student) return null;
    
    return {
      ...student,
      academicStatus: student.status, // Map status to academicStatus
      gpa: 0.0 // Default GPA value
    };
  }

  async findByCareer(careerId: number): Promise<Student[]> {
    const students = await this.prisma.student.findMany({
      where: { careerId },
      include: {
        person: true,
        career: true,
        campus: true,
      },
    });
    
    return students.map(student => ({
      ...student,
      academicStatus: student.status, // Map status to academicStatus
      gpa: 0.0 // Default GPA value
    }));
  }

  async findByCampus(campusId: number): Promise<Student[]> {
    const students = await this.prisma.student.findMany({
      where: { campusId },
      include: {
        person: true,
        career: true,
        campus: true,
      },
    });
    
    return students.map(student => ({
      ...student,
      academicStatus: student.status, // Map status to academicStatus
      gpa: 0.0 // Default GPA value
    }));
  }

  async create(student: Partial<Student>): Promise<Student> {
    const { id, academicStatus, gpa, ...data } = student;
    const createdStudent = await this.prisma.student.create({
      data: data as any,
      include: {
        person: true,
        career: true,
        campus: true,
      },
    });
    
    return {
      ...createdStudent,
      academicStatus: createdStudent.status, // Map status to academicStatus
      gpa: 0.0 // Default GPA value
    };
  }

  async update(id: number, student: Partial<Student>): Promise<Student> {
    const { id: _, academicStatus, gpa, ...data } = student;
    const updatedStudent = await this.prisma.student.update({
      where: { id },
      data: data as any,
      include: {
        person: true,
        career: true,
        campus: true,
      },
    });
    
    return {
      ...updatedStudent,
      academicStatus: updatedStudent.status, // Map status to academicStatus
      gpa: 0.0 // Default GPA value
    };
  }

  async delete(id: number): Promise<void> {
    await this.prisma.student.delete({
      where: { id },
    });
  }

  async updateAcademicStatus(id: number, status: string, gpa: number): Promise<void> {
    // First get the current student data
    const student = await this.prisma.student.findUnique({
      where: { id }
    });
    
    if (!student) return;
    
    // Update the student with the new status and gpa
    await this.prisma.student.update({
      where: { id },
      data: {
        // Use the existing fields from the Prisma schema
        status: status, // Use status field instead of academicStatus
        updatedAt: new Date(),
      },
    });
    
    // The academicStatus and gpa will be handled in the mapping layer
  }

  async findByAcademicStatus(status: string): Promise<Student[]> {
    // Use the status field instead of academicStatus
    const students = await this.prisma.student.findMany({
      where: { status: status },
      include: {
        person: true,
        career: true,
        campus: true,
      },
    });
    
    // Map the Prisma model to the Student entity
    return students.map(student => ({
      ...student,
      academicStatus: student.status, // Map status to academicStatus
      gpa: 0.0 // Default GPA value
    }));
  }

  async getAcademicHistory(id: number): Promise<any> {
    // Obtener todas las secciones completadas por el estudiante
    const studentSections = await this.prisma.studentSection.findMany({
      where: {
        studentId: id,
        finalGrade: { not: null },
        status: 'completed',
      },
      include: {
        section: {
          include: {
            course: true,
            term: true,
          },
        },
      },
      orderBy: {
        section: {
          term: {
            startDate: 'asc',
          },
        },
      },
    });

    // Organizar por término académico
    const history = {};
    
    for (const enrollment of studentSections) {
      const termId = enrollment.section.termId;
      const termName = enrollment.section.term.name;
      
      if (!history[termId]) {
        history[termId] = {
          termId,
          termName,
          startDate: enrollment.section.term.startDate,
          endDate: enrollment.section.term.endDate,
          courses: [],
          termGpa: 0,
          totalCredits: 0,
        };
      }
      
      history[termId].courses.push({
        courseId: enrollment.section.courseId,
        courseCode: enrollment.section.course.code,
        courseName: enrollment.section.course.name,
        credits: enrollment.section.course.credits,
        grade: enrollment.finalGrade,
        status: enrollment.finalGrade >= 3.0 ? 'passed' : 'failed', // Asumiendo 3.0 como nota mínima
      });
    }
    
    // Calcular GPA por término
    for (const termId in history) {
      let totalPoints = 0;
      let totalCredits = 0;
      
      for (const course of history[termId].courses) {
        totalPoints += course.grade * course.credits;
        totalCredits += course.credits;
      }
      
      history[termId].termGpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
      history[termId].totalCredits = totalCredits;
    }
    
    return Object.values(history);
  }
}
