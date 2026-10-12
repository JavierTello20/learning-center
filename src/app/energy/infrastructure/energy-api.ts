import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseApi } from '../../shared/infrastructure/base-api';
import { RegionalOperator } from '../domain/model/regional-operator.entity';
import { RegionalOperatorsApiEndpoint } from './regional-operators-api-endpoint';

/**
 * @summary Provides access to external energy-related resources.
 * @remarks Retrieves regional operators from the external provider.
 * @author Javier Tello
 */
@Injectable({
  providedIn: 'root',
})
export class EnergyApi extends BaseApi {
  readonly #regionalOperatorsEndpoint = new RegionalOperatorsApiEndpoint(this.http);

  getRegionalOperators(): Observable<RegionalOperator[]> {
    return this.#regionalOperatorsEndpoint.getAll();
  }
}
