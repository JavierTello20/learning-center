import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseApi } from '../../shared/infrastructure/base-api';

import { EnergyMonitoringCenter } from '../domain/model/energy-monitoring-center.entity';
import { EnergyReportItem } from '../domain/model/energy-report-item.entity';

import { EnergyMonitoringCentersApiEndpoint } from './energy-monitoring-centers-api-endpoint';

import { EnergyReportItemsApiEndpoint } from './energy-report-items-api-endpoint';

/**
 * @summary Provides access to monitoring backend resources.
 * @remarks Groups the endpoints related to monitoring centers and energy report items.
 * @author Javier Tello
 */
@Injectable({
  providedIn: 'root',
})
export class MonitoringApi extends BaseApi {
  readonly #monitoringCentersEndpoint = new EnergyMonitoringCentersApiEndpoint(this.http);

  readonly #reportItemsEndpoint = new EnergyReportItemsApiEndpoint(this.http);

  getMonitoringCenters(): Observable<EnergyMonitoringCenter[]> {
    return this.#monitoringCentersEndpoint.getAll();
  }

  getEnergyReportItems(): Observable<EnergyReportItem[]> {
    return this.#reportItemsEndpoint.getAll();
  }

  createEnergyReportItem(report: EnergyReportItem): Observable<EnergyReportItem> {
    return this.#reportItemsEndpoint.create(report);
  }
}
