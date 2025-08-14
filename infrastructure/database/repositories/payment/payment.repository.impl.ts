import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Payment } from '../../../../domain/entities/payment.entity';
import { PaymentRepository } from '../../../../domain/repositories/payment.repository';

@Injectable()
export class PaymentRepositoryImpl implements PaymentRepository {
    constructor(private prisma: PrismaService) { }

    async findAll(): Promise<Payment[]> {
        return this.prisma.payment.findMany();
    }

    async findById(id: number): Promise<Payment> {
        return this.prisma.payment.findUnique({
            where: { id },
        });
    }

    async findByStudent(studentId: number): Promise<Payment[]> {
        const payments = await this.prisma.payment.findMany({
            where: {
                invoice: {
                    student: {
                        id: studentId
                    }
                }
            },
            orderBy: { paymentDate: 'desc' },
            include: {
                invoice: true
            }
        });
        
        // Map Prisma model to domain entity
        return payments.map(payment => ({
            ...payment,
            studentId,
            concept: payment.description || 'Payment',
            status: 'completed',
            referenceNumber: `REF-${payment.id}`
        }));
    }

    async findByStatus(status: string): Promise<Payment[]> {
        // Since status is not in the Prisma model, we'll fetch all payments
        // and filter them in memory (not ideal for production)
        const payments = await this.prisma.payment.findMany({
            include: {
                invoice: true
            }
        });
        
        // Map Prisma model to domain entity and filter by status
        return payments
            .map(payment => ({
                ...payment,
                studentId: 0, // This would need to be properly set in a real implementation
                concept: payment.description || 'Payment',
                status: 'completed', // Assuming all payments in DB are completed
                referenceNumber: `REF-${payment.id}`
            }))
            .filter(payment => payment.status === status);
    }

    async findByTerm(termId: number): Promise<Payment[]> {
        return this.prisma.payment.findMany({
            where: { termId },
        });
    }

    async findByStudentAndTerm(studentId: number, termId: number): Promise<Payment[]> {
        const payments = await this.prisma.payment.findMany({
            where: {
                invoice: {
                    student: {
                        id: studentId
                    }
                },
                termId
            },
            include: {
                invoice: true
            }
        });
        
        // Map Prisma model to domain entity
        return payments.map(payment => ({
            ...payment,
            studentId,
            concept: payment.description || 'Payment',
            status: 'completed',
            referenceNumber: `REF-${payment.id}`
        }));
    }

    async create(payment: Partial<Payment>): Promise<Payment> {
        return this.prisma.payment.create({
            data: payment as any,
        });
    }

    async update(id: number, payment: Partial<Payment>): Promise<Payment> {
        return this.prisma.payment.update({
            where: { id },
            data: payment,
        });
    }

    async delete(id: number): Promise<void> {
        await this.prisma.payment.delete({
            where: { id },
        });
    }

    async findRecent(limit: number): Promise<any[]> {
        return this.prisma.payment.findMany({
            take: limit,
            orderBy: { paymentDate: 'desc' },
            include: {
                invoice: {
                    include: {
                        student: {
                            include: {
                                person: true,
                            },
                        },
                    },
                },
            },
        });
    }

    async getMonthlyRevenue(): Promise<number> {
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        const result = await this.prisma.payment.aggregate({
            where: {
                paymentDate: {
                    gte: firstDayOfMonth,
                    lte: lastDayOfMonth,
                }
                // We can't filter by status since it's not in the Prisma model
            },
            _sum: {
                amount: true,
            },
        });

        return result._sum.amount || 0;
    }
}