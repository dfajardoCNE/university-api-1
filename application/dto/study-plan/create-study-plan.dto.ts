import { IsInt, IsNotEmpty, IsOptional, IsString, Min, ValidateNested, ArrayNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateStudyPlanCourseDto } from './study-plan-course.dto';

/**
 * DTO para la creación de un Plan de Estudio. Incluye campos básicos y
 * una colección opcional de cursos con el número de término sugerido.
 */
export class CreateStudyPlanDto {
  @IsInt()
  @Min(1)
  careerId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @ValidateNested({ each: true })
  @Type(() => CreateStudyPlanCourseDto)
  @IsOptional()
  planCourses?: CreateStudyPlanCourseDto[];
}