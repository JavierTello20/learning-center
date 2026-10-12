import { BaseEntity } from '../../../shared/domain/model/base-entity';
import { EnergyType } from './energy-type.type';

/**
 * @summary Represents an energy monitoring center.
 * @remarks Stores the identifier, name and supported energy type of a monitoring center.
 * @author Javier Tello
 */
export class EnergyMonitoringCenter implements BaseEntity {
  #id: number;
  #name: string;
  #energyType: EnergyType;

  constructor(center: { id: number; name: string; energyType: EnergyType }) {
    this.#id = center.id;
    this.#name = center.name;
    this.#energyType = center.energyType;
  }

  get id(): number {
    return this.#id;
  }

  set id(value: number) {
    this.#id = value;
  }

  get name(): string {
    return this.#name;
  }

  set name(value: string) {
    this.#name = value;
  }

  get energyType(): EnergyType {
    return this.#energyType;
  }

  set energyType(value: EnergyType) {
    this.#energyType = value;
  }
}
