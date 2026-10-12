import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { EnergyMonitoringCenter } from '../domain/model/energy-monitoring-center.entity';
import {
  EnergyMonitoringCenterResource,
  EnergyMonitoringCentersResponse,
} from './energy-monitoring-centers-response';
import { EnergyMonitoringCenterAssembler } from './energy-monitoring-center.assembler';

export class EnergyMonitoringCentersApiEndpoint extends BaseApiEndpoint<
  EnergyMonitoringCenter,
  EnergyMonitoringCenterResource,
  EnergyMonitoringCentersResponse,
  EnergyMonitoringCenterAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,

      `${environment.platformProviderApiBaseUrl}${environment.energyMonitoringCentersEndpointPath}`,

      new EnergyMonitoringCenterAssembler(),
    );
  }
}
