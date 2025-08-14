import { PartialType } from '@nestjs/mapped-types';
import { CreateStudyPlanDto } from './create-study-plan.dto';

/**
 * DTO para actualizar un Plan de Estudio. Hereda de CreateStudyPlanDto
 * utilizando PartialType para hacer todos los campos opcionales.
 */
export class UpdateStudyPlanDto extends PartialType(CreateStudyPlanDto) {}