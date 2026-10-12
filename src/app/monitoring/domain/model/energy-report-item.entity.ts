import { BaseEntity } from '../../../shared/domain/model/base-entity';
import { EnergyType } from './energy-type.type';

/**
 * @summary Represents an energy report item.
 * @remarks Contains the energy monitoring information registered by the platform.
 * @author Javier Tello
 */
export class EnergyReportItem implements BaseEntity {
  #id: number;
  #centerId: number;
  #energyType: EnergyType;
  #countryCode: string;
  #countryName: string;
  #consumption: number;
  #production: number;
  #year: number;
  #registeredAt: string;

  constructor(report: {
    id: number;
    centerId: number;
    energyType: EnergyType;
    countryCode: string;
    countryName: string;
    consumption: number;
    production: number;
    year: number;
    registeredAt: string;
  }) {
    this.#id = report.id;
    this.#centerId = report.centerId;
    this.#energyType = report.energyType;
    this.#countryCode = report.countryCode;
    this.#countryName = report.countryName;
    this.#consumption = report.consumption;
    this.#production = report.production;
    this.#year = report.year;
    this.#registeredAt = report.registeredAt;
  }

  get id(): number {
    return this.#id;
  }

  set id(value: number) {
    this.#id = value;
  }

  get centerId(): number {
    return this.#centerId;
  }

  set centerId(value: number) {
    this.#centerId = value;
  }

  get energyType(): EnergyType {
    return this.#energyType;
  }

  set energyType(value: EnergyType) {
    this.#energyType = value;
  }

  get countryCode(): string {
    return this.#countryCode;
  }

  set countryCode(value: string) {
    this.#countryCode = value;
  }

  get countryName(): string {
    return this.#countryName;
  }

  set countryName(value: string) {
    this.#countryName = value;
  }

  get consumption(): number {
    return this.#consumption;
  }

  set consumption(value: number) {
    this.#consumption = value;
  }

  get production(): number {
    return this.#production;
  }

  set production(value: number) {
    this.#production = value;
  }

  get year(): number {
    return this.#year;
  }

  set year(value: number) {
    this.#year = value;
  }

  get registeredAt(): string {
    return this.#registeredAt;
  }

  set registeredAt(value: string) {
    this.#registeredAt = value;
  }
}
