import { ApiProperty } from '@nestjs/swagger';

export class PaymentResponseDto {
  @ApiProperty({ description: 'Payment ID' })
  id: number;

  @ApiProperty({ description: 'Student ID' })
  studentId: number;

  @ApiProperty({ description: 'Payment amount' })
  amount: number;

  @ApiProperty({ description: 'Payment concept' })
  concept: string;

  @ApiProperty({ description: 'Payment date' })
  paymentDate: Date;

  @ApiProperty({ description: 'Payment status' })
  status: string;

  @ApiProperty({ description: 'Payment method used' })
  paymentMethod: string;

  @ApiProperty({ description: 'Reference number' })
  referenceNumber: string;

  @ApiProperty({ description: 'Term ID', required: false })
  termId?: number;

  @ApiProperty({ description: 'Description', required: false })
  description?: string;

  @ApiProperty({ description: 'Creation date' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update date' })
  updatedAt: Date;
}