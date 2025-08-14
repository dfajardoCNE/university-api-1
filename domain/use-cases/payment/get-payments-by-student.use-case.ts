import { Injectable, Inject } from '@nestjs/common';
import { Payment } from '../../entities/payment.entity';
import { PaymentRepository } from '../../repositories/payment.repository';

@Injectable()
export class GetPaymentsByStudentUseCase {
  constructor(
    @Inject('PaymentRepository')
    private readonly paymentRepository: PaymentRepository,
  ) {}

  async execute(studentId: number): Promise<Payment[]> {
    return this.paymentRepository.findByStudent(studentId);
  }
}