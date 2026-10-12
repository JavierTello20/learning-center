import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

/**
 * @summary Represents the address resource returned by DummyJSON.
 * @remarks Contains the regional data required by the application.
 * @author Javier Tello
 */
export interface RegionalOperatorAddressResource {
  stateCode: string;
  country: string;
}

/**
 * @summary Represents a regional operator resource.
 * @remarks Reflects the user structure returned by DummyJSON.
 * @author Javier Tello
 */
export interface RegionalOperatorResource extends BaseResource {
  id: number;
  firstName: string;
  lastName: string;
  address: RegionalOperatorAddressResource;
}

/**
 * @summary Represents the DummyJSON users response.
 * @remarks Contains the regional operator resources returned by DummyJSON.
 * @author Javier Tello
 */
export interface RegionalOperatorsResponse extends BaseResponse {
  users: RegionalOperatorResource[];
}
