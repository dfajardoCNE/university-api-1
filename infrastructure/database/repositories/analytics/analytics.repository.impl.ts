import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

/**
 * Repositorio para obtener estadísticas agregadas del sistema. Realiza
 * consultas a múltiples tablas a través de Prisma para retornar
 * información consolidada para reportes y dashboards avanzados.
 */
@Injectable()
export class AnalyticsRepositoryImpl {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Obtiene estadísticas generales del sistema: número de estudiantes,
   * profesores y cursos, facturación pendiente, ingresos mensuales y
   * estudiantes en estado de probatoria académica.
   */
  async getOverview() {
    // Conteo de entidades principales
    const studentCountPromise = this.prisma.student.count();
    const professorCountPromise = this.prisma.professor.count();
    const courseCountPromise = this.prisma.course.count();

    // Facturas pendientes
    const pendingInvoicesPromise = this.prisma.invoice.findMany({
      where: { status: 'pending' },
      select: { amount: true },
    });

    // Ingresos mensuales completados
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const monthlyRevenuePromise = this.prisma.payment.aggregate({
      where: {
        paymentDate: {
          gte: firstDayOfMonth,
          lte: lastDayOfMonth,
        },
        status: 'completed',
      },
      _sum: {
        amount: true,
      },
    });

    // Estudiantes en probatoria académica
    const probationCountPromise = this.prisma.student.count({
      where: { academicStatus: 'academic_probation' },
    });

    const [studentCount, professorCount, courseCount, pendingInvoices, monthlyRevenue, probationCount] =
      await Promise.all([
        studentCountPromise,
        professorCountPromise,
        courseCountPromise,
        pendingInvoicesPromise,
        monthlyRevenuePromise,
        probationCountPromise,
      ]);

    const pendingAmount = pendingInvoices.reduce((sum, inv) => sum + inv.amount, 0);
    const monthlyRevenueAmount = monthlyRevenue._sum.amount || 0;

    return {
      studentCount,
      professorCount,
      courseCount,
      pendingInvoicesCount: pendingInvoices.length,
      pendingAmount,
      monthlyRevenue: monthlyRevenueAmount,
      studentsOnProbationCount: probationCount,
    };
  }
}