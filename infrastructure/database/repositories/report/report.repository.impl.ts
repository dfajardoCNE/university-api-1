import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Report } from '../../../../domain/entities/report.entity';
import { ReportRepository } from '../../../../domain/repositories/report.repository';

@Injectable()
export class ReportRepositoryImpl implements ReportRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Report[]> {
    const reports = await this.prisma.report.findMany({
      include: {
        user: {
          include: {
            person: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return reports.map(report => ({
      id: report.id,
      threadId: report.threadId,
      postId: report.postId,
      reportedBy: report.reportedBy,
      reason: report.reason,
      status: report.status,
      createdAt: report.createdAt,
      resolvedAt: report.resolvedAt
    }));
  }

  async findById(id: number): Promise<Report> {
    const report = await this.prisma.report.findUnique({
      where: { id },
      include: {
        user: {
          include: {
            person: true,
          },
        },
      },
    });
    
    if (!report) return null;
    
    return {
      id: report.id,
      threadId: report.threadId,
      postId: report.postId,
      reportedBy: report.reportedBy,
      reason: report.reason,
      status: report.status,
      createdAt: report.createdAt,
      resolvedAt: report.resolvedAt
    };
  }

  async findByStatus(status: string): Promise<Report[]> {
    const reports = await this.prisma.report.findMany({
      where: { status },
      include: {
        user: {
          include: {
            person: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return reports.map(report => ({
      id: report.id,
      threadId: report.threadId,
      postId: report.postId,
      reportedBy: report.reportedBy,
      reason: report.reason,
      status: report.status,
      createdAt: report.createdAt,
      resolvedAt: report.resolvedAt
    }));
  }

  async findByUser(userId: number): Promise<Report[]> {
    const reports = await this.prisma.report.findMany({
      where: { reportedBy: userId },
      include: {
        user: {
          include: {
            person: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return reports.map(report => ({
      id: report.id,
      threadId: report.threadId,
      postId: report.postId,
      reportedBy: report.reportedBy,
      reason: report.reason,
      status: report.status,
      createdAt: report.createdAt,
      resolvedAt: report.resolvedAt
    }));
  }

  async create(report: Partial<Report>): Promise<Report> {
    const { id, ...data } = report;
    const createdReport = await this.prisma.report.create({
      data: {
        userId: data.reportedBy,
        professorId: 1, // Default professor ID as required by the schema
        threadId: data.threadId,
        postId: data.postId,
        reportedBy: data.reportedBy,
        reason: data.reason,
        status: data.status || 'pending',
        title: '',
        content: ''
      },
      include: {
        user: {
          include: {
            person: true,
          },
        },
      },
    });
    
    return {
      id: createdReport.id,
      threadId: createdReport.threadId,
      postId: createdReport.postId,
      reportedBy: createdReport.reportedBy,
      reason: createdReport.reason,
      status: createdReport.status,
      createdAt: createdReport.createdAt,
      resolvedAt: createdReport.resolvedAt
    };
  }

  async updateStatus(id: number, status: string): Promise<Report> {
    const data: any = { status };
    
    // Si el estado es 'resolved', agregar la fecha de resolución
    if (status === 'resolved') {
      data.resolvedAt = new Date();
    }
    
    const updatedReport = await this.prisma.report.update({
      where: { id },
      data: data,
      include: {
        user: {
          include: {
            person: true,
          },
        },
      },
    });
    
    return {
      id: updatedReport.id,
      threadId: updatedReport.threadId,
      postId: updatedReport.postId,
      reportedBy: updatedReport.reportedBy,
      reason: updatedReport.reason,
      status: updatedReport.status,
      createdAt: updatedReport.createdAt,
      resolvedAt: updatedReport.resolvedAt
    };
  }

  async delete(id: number): Promise<void> {
    await this.prisma.report.delete({
      where: { id },
    });
  }
}
