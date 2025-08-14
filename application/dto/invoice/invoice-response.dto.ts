import { ApiProperty } from '@nestjs/swagger';

/**
 * Response DTO for invoice resources.  Mirrors the domain entity
 * while allowing the API to evolve independently from the
 * persistence model.
 */
export class InvoiceResponseDto {
  @ApiProperty({ description: 'Unique identifier of the invoice' })
  id: number;

  @ApiProperty({ description: 'Identifier of the student that owns the invoice' })
  studentId: number;

  @ApiProperty({ description: 'Amount of the invoice' })
  amount: number;

  @ApiProperty({ description: 'Concept or reason for the invoice' })
  concept: string;

  @ApiProperty({ description: 'Due date of the invoice', type: String })
  dueDate: Date;

  @ApiProperty({ description: 'Current status of the invoice' })
  status: string;

  @ApiProperty({ description: 'Identifier of the academic term', required: false })
  termId?: number;

  @ApiProperty({ description: 'Additional description of the invoice', required: false })
  description?: string;

  @ApiProperty({ description: 'Date when the record was created', type: String })
  createdAt: Date;

  @ApiProperty({ description: 'Date when the record was last updated', type: String })
  updatedAt: Date;
}