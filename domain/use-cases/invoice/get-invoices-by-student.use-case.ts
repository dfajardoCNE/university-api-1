import { Injectable, Inject } from '@nestjs/common';
import { Invoice } from '../../entities/invoice.entity';
import { InvoiceRepository } from '../../repositories/invoice.repository';

/**
 * Use case to list all invoices associated with a student.
 */
@Injectable()
export class GetInvoicesByStudentUseCase {
  constructor(
    @Inject('InvoiceRepository')
    private readonly invoiceRepository: InvoiceRepository,
  ) {}

  async execute(studentId: number): Promise<Invoice[]> {
    return this.invoiceRepository.findByStudent(studentId);
  }
}