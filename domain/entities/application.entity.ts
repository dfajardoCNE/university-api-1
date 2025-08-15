export class Application {
  id: number;
  userId: number;
  personId: number;
  careerId: number;
  campusId: number;
  applicationDate: Date;
  status: string;
  documents?: string;
  comments?: string;
  reviewedBy?: number;
  reviewedAt?: Date;
  admissionResult?: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}