import * as $metadata from './metadata.g'
import * as $models from './models.g'
import * as $apiClients from './api-clients.g'
import { ViewModel, ListViewModel, ViewModelCollection, ServiceViewModel, type DeepPartial, defineProps } from 'coalesce-vue/lib/viewmodel'

export interface EquipmentViewModel extends $models.Equipment {
  equipmentId: number | null;
  name: string | null;
  icon: string | null;
  modifiedById: string | null;
  modifiedOn: Date | null;
  createdById: string | null;
  createdOn: Date | null;
}
export class EquipmentViewModel extends ViewModel<$models.Equipment, $apiClients.EquipmentApiClient, number> implements $models.Equipment  {
  
  constructor(initialData?: DeepPartial<$models.Equipment> | null) {
    super($metadata.Equipment, new $apiClients.EquipmentApiClient(), initialData)
  }
}
defineProps(EquipmentViewModel, $metadata.Equipment)

export class EquipmentListViewModel extends ListViewModel<$models.Equipment, $apiClients.EquipmentApiClient, EquipmentViewModel> {
  
  constructor() {
    super($metadata.Equipment, new $apiClients.EquipmentApiClient())
  }
}


export class SecurityServiceViewModel extends ServiceViewModel<typeof $metadata.SecurityService, $apiClients.SecurityServiceApiClient> {
  
  public get whoAmI() {
    const whoAmI = this.$apiClient.$makeCaller(
      this.$metadata.methods.whoAmI,
      (c) => c.whoAmI(),
      () => ({}),
      (c, args) => c.whoAmI())
    
    Object.defineProperty(this, 'whoAmI', {value: whoAmI});
    return whoAmI
  }
  
  constructor() {
    super($metadata.SecurityService, new $apiClients.SecurityServiceApiClient())
  }
}


export class WorkoutServiceViewModel extends ServiceViewModel<typeof $metadata.WorkoutService, $apiClients.WorkoutServiceApiClient> {
  
  public get generateWorkout() {
    const generateWorkout = this.$apiClient.$makeCaller(
      this.$metadata.methods.generateWorkout,
      (c, workingRequest: string | null) => c.generateWorkout(workingRequest),
      () => ({workingRequest: null as string | null, }),
      (c, args) => c.generateWorkout(args.workingRequest))
    
    Object.defineProperty(this, 'generateWorkout', {value: generateWorkout});
    return generateWorkout
  }
  
  constructor() {
    super($metadata.WorkoutService, new $apiClients.WorkoutServiceApiClient())
  }
}


const viewModelTypeLookup = ViewModel.typeLookup = {
  Equipment: EquipmentViewModel,
}
const listViewModelTypeLookup = ListViewModel.typeLookup = {
  Equipment: EquipmentListViewModel,
}
const serviceViewModelTypeLookup = ServiceViewModel.typeLookup = {
  SecurityService: SecurityServiceViewModel,
  WorkoutService: WorkoutServiceViewModel,
}

