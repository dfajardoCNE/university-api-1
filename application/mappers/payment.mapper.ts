import { Payment } from '../../domain/entities/payment.entity';
import { PaymentResponseDto } from '../dto/payment/payment-response.dto';

export class PaymentMapper {
  static toResponseDto(payment: Payment): PaymentResponseDto {
    return {
      id: payment.id,
      studentId: payment.studentId,
      amount: payment.amount,
      concept: payment.concept,
      paymentDate: payment.paymentDate,
      status: payment.status,
      paymentMethod: payment.paymentMethod,
      referenceNumber: payment.referenceNumber,
      termId: payment.termId,
      description: payment.description,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
    };
  }

  static toResponseDtoArray(payments: Payment[]): PaymentResponseDto[] {
    return payments.map(payment => this.toResponseDto(payment));
  }
}