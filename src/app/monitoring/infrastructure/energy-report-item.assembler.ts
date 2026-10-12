import { Injectable } from '@angular/core';
import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { EnergyReportItem } from '../domain/model/energy-report-item.entity';
import {
  EnergyReportItemResource,
  EnergyReportItemsResponse,
} from './energy-report-items-response';

/**
 * @summary Converts energy report items between resource and entity representations.
 * @remarks Supports reading and writing energy report information.
 * @author Javier Tello
 */
@Injectable({
  providedIn: 'root',
})
export class EnergyReportItemAssembler implements BaseAssembler<
  EnergyReportItem,
  EnergyReportItemResource,
  EnergyReportItemsResponse
> {
  toEntityFromResource(resource: EnergyReportItemResource): EnergyReportItem {
    return new EnergyReportItem({
      id: resource.id,
      centerId: resource.centerId,
      energyType: resource.energyType,
      countryCode: resource.countryCode,
      countryName: resource.countryName,
      consumption: resource.consumption,
      production: resource.production,
      year: resource.year,
      registeredAt: resource.registeredAt,
    });
  }

  toResourceFromEntity(entity: EnergyReportItem): EnergyReportItemResource {
    return {
      id: entity.id,
      centerId: entity.centerId,
      energyType: entity.energyType,
      countryCode: entity.countryCode,
      countryName: entity.countryName,
      consumption: entity.consumption,
      production: entity.production,
      year: entity.year,
      registeredAt: entity.registeredAt,
    };
  }

  toEntitiesFromResponse(response: EnergyReportItemsResponse): EnergyReportItem[] {
    return response.energyReportItems.map((resource) => this.toEntityFromResource(resource));
  }
}
