import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { EnergyReportItem } from '../domain/model/energy-report-item.entity';
import {
  EnergyReportItemResource,
  EnergyReportItemsResponse,
} from './energy-report-items-response';
import { EnergyReportItemAssembler } from './energy-report-item.assembler';

export class EnergyReportItemsApiEndpoint extends BaseApiEndpoint<
  EnergyReportItem,
  EnergyReportItemResource,
  EnergyReportItemsResponse,
  EnergyReportItemAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,

      `${environment.platformProviderApiBaseUrl}${environment.energyReportItemsEndpointPath}`,

      new EnergyReportItemAssembler(),
    );
  }
}
