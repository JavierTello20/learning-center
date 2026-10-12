import { computed, inject, Injectable, Signal, signal } from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, retry, tap } from 'rxjs';

import { MonitoringApi } from '../infrastructure/monitoring-api';
import { EnergyMonitoringCenter } from '../domain/model/energy-monitoring-center.entity';
import { EnergyReportItem } from '../domain/model/energy-report-item.entity';
import { EnergyType } from '../domain/model/energy-type.type';

/**
 * @summary Manages monitoring application state.
 * @remarks Loads monitoring centers and energy report items,
 * and exposes them through Angular Signals.
 * @author Javier Tello
 */
@Injectable({
  providedIn: 'root',
})
export class MonitoringStore {
  readonly #monitoringApi = inject(MonitoringApi);

  readonly #monitoringCentersSignal = signal<EnergyMonitoringCenter[]>([]);

  readonly monitoringCenters = this.#monitoringCentersSignal.asReadonly();

  readonly #energyReportItemsSignal = signal<EnergyReportItem[]>([]);

  readonly energyReportItems = this.#energyReportItemsSignal.asReadonly();

  readonly #loadingSignal = signal<boolean>(false);

  readonly loading = this.#loadingSignal.asReadonly();

  readonly #errorSignal = signal<string | null>(null);

  readonly error = this.#errorSignal.asReadonly();

  readonly reportCount = computed(() => this.energyReportItems().length);

  constructor() {
    this.#loadMonitoringCenters();
    this.#loadEnergyReportItems();
  }

  getMonitoringCenterByEnergyType(
    energyType: EnergyType,
  ): Signal<EnergyMonitoringCenter | undefined> {
    return computed(() =>
      this.monitoringCenters().find((center) => center.energyType === energyType),
    );
  }

  getReportByEnergyType(energyType: EnergyType): Signal<EnergyReportItem | undefined> {
    return computed(() =>
      this.energyReportItems().find((report) => report.energyType === energyType),
    );
  }

  addEnergyReportItem(report: EnergyReportItem): Observable<EnergyReportItem> {
    this.#loadingSignal.set(true);
    this.#errorSignal.set(null);

    return this.#monitoringApi.createEnergyReportItem(report).pipe(
      retry(2),

      tap({
        next: (createdReport) => {
          this.#energyReportItemsSignal.update((reports) => [...reports, createdReport]);

          this.#loadingSignal.set(false);
        },

        error: (error) => {
          this.#errorSignal.set(
            error instanceof Error ? error.message : 'Failed to create energy report',
          );

          this.#loadingSignal.set(false);
        },
      }),
    );
  }

  #loadMonitoringCenters(): void {
    this.#loadingSignal.set(true);
    this.#errorSignal.set(null);

    this.#monitoringApi
      .getMonitoringCenters()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (centers) => {
          this.#monitoringCentersSignal.set(centers);

          this.#loadingSignal.set(false);
        },

        error: (error) => {
          this.#errorSignal.set(
            error instanceof Error ? error.message : 'Failed to load monitoring centers',
          );

          this.#loadingSignal.set(false);
        },
      });
  }

  #loadEnergyReportItems(): void {
    this.#loadingSignal.set(true);
    this.#errorSignal.set(null);

    this.#monitoringApi
      .getEnergyReportItems()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (reports) => {
          this.#energyReportItemsSignal.set(reports);

          this.#loadingSignal.set(false);
        },

        error: (error) => {
          this.#errorSignal.set(
            error instanceof Error ? error.message : 'Failed to load energy reports',
          );

          this.#loadingSignal.set(false);
        },
      });
  }
}
