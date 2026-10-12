import { Injectable } from '@angular/core';
import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { EnergyMonitoringCenter } from '../domain/model/energy-monitoring-center.entity';
import {
  EnergyMonitoringCenterResource,
  EnergyMonitoringCentersResponse,
} from './energy-monitoring-centers-response';

/**
 * @summary Converts energy monitoring center data between resource and entity representations.
 * @remarks Implements the mappings required by the monitoring bounded context.
 * @author Javier Tello
 */
@Injectable({
  providedIn: 'root',
})
export class EnergyMonitoringCenterAssembler implements BaseAssembler<
  EnergyMonitoringCenter,
  EnergyMonitoringCenterResource,
  EnergyMonitoringCentersResponse
> {
  toEntityFromResource(resource: EnergyMonitoringCenterResource): EnergyMonitoringCenter {
    return new EnergyMonitoringCenter({
      id: resource.id,
      name: resource.name,
      energyType: resource.energyType,
    });
  }

  toResourceFromEntity(entity: EnergyMonitoringCenter): EnergyMonitoringCenterResource {
    return {
      id: entity.id,
      name: entity.name,
      energyType: entity.energyType,
    };
  }

  toEntitiesFromResponse(response: EnergyMonitoringCentersResponse): EnergyMonitoringCenter[] {
    return response.energyMonitoringCenters.map((resource) => this.toEntityFromResource(resource));
  }
}
