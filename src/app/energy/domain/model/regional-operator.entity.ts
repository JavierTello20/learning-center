import { BaseEntity } from '../../../shared/domain/model/base-entity';

/**
 * @summary Represents a regional energy operator.
 * @remarks Contains regional information obtained from the external DummyJSON provider.
 * @author Javier Tello
 */
export class RegionalOperator implements BaseEntity {
  #id: number;
  #firstName: string;
  #lastName: string;
  #countryCode: string;
  #countryName: string;

  constructor(operator: {
    id: number;
    firstName: string;
    lastName: string;
    countryCode: string;
    countryName: string;
  }) {
    this.#id = operator.id;
    this.#firstName = operator.firstName;
    this.#lastName = operator.lastName;
    this.#countryCode = operator.countryCode;
    this.#countryName = operator.countryName;
  }

  get id(): number {
    return this.#id;
  }

  set id(value: number) {
    this.#id = value;
  }

  get firstName(): string {
    return this.#firstName;
  }

  set firstName(value: string) {
    this.#firstName = value;
  }

  get lastName(): string {
    return this.#lastName;
  }

  set lastName(value: string) {
    this.#lastName = value;
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

  get fullName(): string {
    return `${this.#firstName} ${this.#lastName}`;
  }
}
