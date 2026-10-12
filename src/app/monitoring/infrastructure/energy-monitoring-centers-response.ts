import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';
import { EnergyType } from '../domain/model/energy-type.type';

/**
 * @summary Represents the response for energy monitoring centers.
 * @remarks Contains monitoring center resources returned by the provider.
 * @author Javier Tello
 */
export interface EnergyMonitoringCentersResponse extends BaseResponse {
  energyMonitoringCenters: EnergyMonitoringCenterResource[];
}

/**
 * @summary Represents an energy monitoring center resource.
 * @remarks Reflects the data structure returned by the backend.
 * @author Javier Tello
 */
export interface EnergyMonitoringCenterResource extends BaseResource {
  id: number;
  name: string;
  energyType: EnergyType;
}
