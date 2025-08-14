import { StudyPlan } from '../../domain/entities/study-plan.entity';
import { StudyPlanResponseDto, StudyPlanCourseItemDto } from '../dto/study-plan/study-plan-response.dto';

/**
 * Mapper para convertir entidades StudyPlan a DTOs de respuesta.
 */
export class StudyPlanMapper {
  static toResponseDto(entity: StudyPlan): StudyPlanResponseDto {
    const dto = new StudyPlanResponseDto();
    dto.id = entity.id;
    dto.careerId = entity.careerId;
    dto.name = entity.name;
    dto.description = entity.description;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    if (entity.planCourses) {
      dto.planCourses = entity.planCourses.map((pc) => {
        const item = new StudyPlanCourseItemDto();
        item.courseId = pc.courseId;
        item.termNumber = pc.termNumber;
        return item;
      });
    }
    return dto;
  }
}