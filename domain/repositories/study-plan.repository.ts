import { StudyPlan } from '../entities/study-plan.entity';

/**
 * Interfaz de repositorio para el agregado de Plan de Estudio. Permite
 * abstraer la capa de persistencia y facilita la implementación con
 * diferentes ORMs o fuentes de datos.
 */
export interface StudyPlanRepository {
  findAll(): Promise<StudyPlan[]>;
  findById(id: number): Promise<StudyPlan | null>;
  findByCareer(careerId: number): Promise<StudyPlan[]>;
  create(data: Partial<StudyPlan>): Promise<StudyPlan>;
  update(id: number, data: Partial<StudyPlan>): Promise<StudyPlan>;
  delete(id: number): Promise<void>;
}