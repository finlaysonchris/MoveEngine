import * as $metadata from './metadata.g'
import * as $models from './models.g'
import { ModelApiClient, ServiceApiClient } from 'coalesce-vue/lib/api-client'
import type { AxiosPromise, AxiosRequestConfig, ItemResult, ListResult } from 'coalesce-vue/lib/api-client'

export class EquipmentApiClient extends ModelApiClient<$models.Equipment> {
  constructor() { super($metadata.Equipment) }
}


export class SecurityServiceApiClient extends ServiceApiClient<typeof $metadata.SecurityService> {
  constructor() { super($metadata.SecurityService) }
  public whoAmI($config?: AxiosRequestConfig): AxiosPromise<ItemResult<$models.UserInfo>> {
    const $method = this.$metadata.methods.whoAmI
    const $params =  {
    }
    return this.$invoke($method, $params, $config)
  }
  
}


export class WorkoutServiceApiClient extends ServiceApiClient<typeof $metadata.WorkoutService> {
  constructor() { super($metadata.WorkoutService) }
  public generateWorkout(workingRequest: string | null, $config?: AxiosRequestConfig): AxiosPromise<ItemResult<string>> {
    const $method = this.$metadata.methods.generateWorkout
    const $params =  {
      workingRequest,
    }
    return this.$invoke($method, $params, $config)
  }
  
}


