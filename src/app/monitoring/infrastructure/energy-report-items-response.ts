import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';
import { EnergyType } from '../domain/model/energy-type.type';

/**
 * @summary Represents the response for energy report items.
 * @remarks Contains energy report resources returned by the backend.
 * @author Javier Tello
 */
export interface EnergyReportItemsResponse extends BaseResponse {
  energyReportItems: EnergyReportItemResource[];
}

/**
 * @summary Represents an energy report item resource.
 * @remarks Reflects the energy report data exchanged with json-server.
 * @author Javier Tello
 */
export interface EnergyReportItemResource extends BaseResource {
  id: number;
  centerId: number;
  energyType: EnergyType;
  countryCode: string;
  countryName: string;
  consumption: number;
  production: number;
  year: number;
  registeredAt: string;
}
