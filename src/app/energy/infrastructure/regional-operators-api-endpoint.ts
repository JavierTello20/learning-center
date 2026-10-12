import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { RegionalOperator } from '../domain/model/regional-operator.entity';
import { RegionalOperatorResource, RegionalOperatorsResponse } from './regional-operators-response';
import { RegionalOperatorAssembler } from './regional-operator.assembler';

export class RegionalOperatorsApiEndpoint extends BaseApiEndpoint<
  RegionalOperator,
  RegionalOperatorResource,
  RegionalOperatorsResponse,
  RegionalOperatorAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,

      `${environment.externalProviderApiBaseUrl}${environment.regionalOperatorsEndpointPath}`,

      new RegionalOperatorAssembler(),
    );
  }
}
