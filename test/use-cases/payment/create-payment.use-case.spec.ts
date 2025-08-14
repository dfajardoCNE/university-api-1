import { CreatePaymentUseCase } from '../../../domain/use-cases/payment/create-payment.use-case';
import { Payment } from '../../../domain/entities/payment.entity';

describe('CreatePaymentUseCase', () => {
  it('should create a payment, update invoice and send notification', async () => {
    // Arrange: create mocks for dependencies
    const mockPayment: Payment = {
      id: 1,
      studentId: 1,
      amount: 100,
      concept: 'Tuition',
      paymentDate: new Date(),
      status: 'completed',
      paymentMethod: 'cash',
      referenceNumber: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      termId: null,
      description: null,
    };

    const paymentRepository = {
      create: jest.fn().mockResolvedValue(mockPayment),
    } as any;

    const invoiceRepository = {
      findById: jest.fn().mockResolvedValue({ id: 1, studentId: 1, amount: 100 }),
      updateStatus: jest.fn().mockResolvedValue(undefined),
    } as any;

    const notificationService = {
      sendNotification: jest.fn().mockResolvedValue(undefined),
    } as any;

    const useCase = new CreatePaymentUseCase(paymentRepository, invoiceRepository, notificationService);
    const paymentData = { studentId: 1, amount: 100, referenceNumber: '1' };

    // Act
    const result = await useCase.execute(paymentData);

    // Assert: ensure methods were called appropriately
    expect(paymentRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        studentId: paymentData.studentId,
        amount: paymentData.amount,
        status: 'completed',
      }),
    );
    expect(invoiceRepository.findById).toHaveBeenCalledWith(1);
    expect(invoiceRepository.updateStatus).toHaveBeenCalledWith(1, 'paid');
    expect(notificationService.sendNotification).toHaveBeenCalled();
    expect(result).toEqual(mockPayment);
  });
});