import { Application } from '../../domain/entities/application.entity';
import { ApplicationResponseDto, DocumentDto } from '../dto/application/application-response.dto';
import { ApplicationDocument } from '../../domain/entities/application-document.entity';

export class ApplicationMapper {
  static toResponseDto(application: Application): ApplicationResponseDto {
    const response: ApplicationResponseDto = {
      id: application.id,
      personId: application.personId,
      careerId: application.careerId,
      campusId: application.campusId,
      applicationDate: application.applicationDate,
      status: application.status,
      createdAt: application.createdAt,
      documents: [] as DocumentDto[],
    };

    // Convert string documents to DocumentDto array if needed
    if (application.documents) {
      try {
        const parsedDocs = JSON.parse(application.documents);
        if (Array.isArray(parsedDocs)) {
          response.documents = parsedDocs.map(doc => ({
            id: doc.id,
            documentType: doc.documentType,
            filePath: doc.filePath,
            uploadDate: new Date(doc.uploadDate),
          }));
        }
      } catch (e) {
        // If parsing fails, leave documents as empty array
      }
    }

    // Add application documents if they exist
    if (application['applicationDocuments']) {
      response.documents = application['applicationDocuments'].map(doc => ({
        id: doc.id,
        documentType: doc.documentType,
        filePath: doc.filePath,
        uploadDate: doc.uploadDate,
      }));
    }

    // Add related entities if they exist
    if (application['person']) {
      response.person = {
        id: application['person'].id,
        firstName: application['person'].firstName,
        lastName: application['person'].lastName,
        email: application['person'].email,
      };
    }

    if (application['career']) {
      response.career = {
        id: application['career'].id,
        name: application['career'].name,
      };
    }

    return response;
  }

  static toResponseDtoArray(applications: Application[]): ApplicationResponseDto[] {
    return applications.map(application => this.toResponseDto(application));
  }
}