import { Injectable } from '@angular/core';
import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { RegionalOperator } from '../domain/model/regional-operator.entity';
import { RegionalOperatorResource, RegionalOperatorsResponse } from './regional-operators-response';

/**
 * @summary Converts DummyJSON user resources into regional operator entities.
 * @remarks Maps address information into the regional fields required by the application.
 * @author Javier Tello
 */
@Injectable({
  providedIn: 'root',
})
export class RegionalOperatorAssembler implements BaseAssembler<
  RegionalOperator,
  RegionalOperatorResource,
  RegionalOperatorsResponse
> {
  toEntityFromResource(resource: RegionalOperatorResource): RegionalOperator {
    return new RegionalOperator({
      id: resource.id,
      firstName: resource.firstName,
      lastName: resource.lastName,

      countryCode: `US-${resource.address.stateCode}`,

      countryName: resource.address.country,
    });
  }

  toResourceFromEntity(entity: RegionalOperator): RegionalOperatorResource {
    return {
      id: entity.id,
      firstName: entity.firstName,
      lastName: entity.lastName,

      address: {
        stateCode: entity.countryCode.replace('US-', ''),

        country: entity.countryName,
      },
    };
  }

  toEntitiesFromResponse(response: RegionalOperatorsResponse): RegionalOperator[] {
    return response.users.map((resource) => this.toEntityFromResource(resource));
  }
}
