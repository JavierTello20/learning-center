import { computed, inject, Injectable, Signal, signal } from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { EnergyApi } from '../infrastructure/energy-api';
import { RegionalOperator } from '../domain/model/regional-operator.entity';

/**
 * @summary Manages regional operator application state.
 * @remarks Retrieves regional operators from the external provider
 * and exposes them through Angular Signals.
 * @author Javier Tello
 */
@Injectable({
  providedIn: 'root',
})
export class EnergyStore {
  readonly #energyApi = inject(EnergyApi);

  readonly #regionalOperatorsSignal = signal<RegionalOperator[]>([]);

  readonly regionalOperators = this.#regionalOperatorsSignal.asReadonly();

  readonly #loadingSignal = signal<boolean>(false);

  readonly loading = this.#loadingSignal.asReadonly();

  readonly #errorSignal = signal<string | null>(null);

  readonly error = this.#errorSignal.asReadonly();

  readonly regionalOperatorCount = computed(() => this.regionalOperators().length);

  constructor() {
    this.#loadRegionalOperators();
  }

  getRegionalOperatorById(id: number): Signal<RegionalOperator | undefined> {
    return computed(() => this.regionalOperators().find((operator) => operator.id === id));
  }

  #loadRegionalOperators(): void {
    this.#loadingSignal.set(true);
    this.#errorSignal.set(null);

    this.#energyApi
      .getRegionalOperators()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (operators) => {
          this.#regionalOperatorsSignal.set(operators);

          this.#loadingSignal.set(false);
        },

        error: (error) => {
          this.#errorSignal.set(
            error instanceof Error ? error.message : 'Failed to load regional operators',
          );

          this.#loadingSignal.set(false);
        },
      });
  }
}
