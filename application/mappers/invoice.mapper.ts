import { Invoice } from '../../domain/entities/invoice.entity';
import { InvoiceResponseDto } from '../dto/invoice/invoice-response.dto';

/**
 * Mapper to convert invoice entities to response DTOs.  Centralizes
 * the transformation logic so controllers and use cases can remain
 * agnostic of presentation details.
 */
export class InvoiceMapper {
  static toResponseDto(invoice: Invoice): InvoiceResponseDto {
    return {
      id: invoice.id,
      studentId: invoice.studentId,
      amount: invoice.amount,
      concept: invoice.concept,
      dueDate: invoice.dueDate,
      status: invoice.status,
      termId: invoice.termId,
      description: invoice.description,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    };
  }

  static toResponseDtoArray(invoices: Invoice[]): InvoiceResponseDto[] {
    return invoices.map((invoice) => this.toResponseDto(invoice));
  }
}