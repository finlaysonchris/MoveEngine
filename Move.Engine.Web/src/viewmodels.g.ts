import * as $metadata from './metadata.g'
import * as $models from './models.g'
import * as $apiClients from './api-clients.g'
import { ViewModel, ListViewModel, ViewModelCollection, ServiceViewModel, type DeepPartial, defineProps } from 'coalesce-vue/lib/viewmodel'

export interface RoleViewModel extends $models.Role {
  name: string | null;
  permissions: $models.Permission[] | null;
  id: string | null;
}
export class RoleViewModel extends ViewModel<$models.Role, $apiClients.RoleApiClient, string> implements $models.Role  {
  
  constructor(initialData?: DeepPartial<$models.Role> | null) {
    super($metadata.Role, new $apiClients.RoleApiClient(), initialData)
  }
}
defineProps(RoleViewModel, $metadata.Role)

export class RoleListViewModel extends ListViewModel<$models.Role, $apiClients.RoleApiClient, RoleViewModel> {
  
  constructor() {
    super($metadata.Role, new $apiClients.RoleApiClient())
  }
}


export interface UserViewModel extends $models.User {
  fullName: string | null;
  userName: string | null;
  email: string | null;
  emailConfirmed: boolean | null;
  photoHash: string | null;
  
  /** If set, the user will be blocked from signing in until this date. */
  lockoutEnd: Date | null;
  
  /** If enabled, the user can be locked out. */
  lockoutEnabled: boolean | null;
  get userRoles(): ViewModelCollection<UserRoleViewModel, $models.UserRole>;
  set userRoles(value: (UserRoleViewModel | $models.UserRole)[] | null);
  roleNames: string[] | null;
  id: string | null;
}
export class UserViewModel extends ViewModel<$models.User, $apiClients.UserApiClient, string> implements $models.User  {
  static DataSources = $models.User.DataSources;
  
  
  public addToUserRoles(initialData?: DeepPartial<$models.UserRole> | null) {
    return this.$addChild('userRoles', initialData) as UserRoleViewModel
  }
  
  get roles(): ReadonlyArray<RoleViewModel> {
    return (this.userRoles || []).map($ => $.role!).filter($ => $)
  }
  
  public get getPhoto() {
    const getPhoto = this.$apiClient.$makeCaller(
      this.$metadata.methods.getPhoto,
      (c) => c.getPhoto(this.$primaryKey, this.photoHash),
      () => ({}),
      (c, args) => c.getPhoto(this.$primaryKey, this.photoHash))
    
    Object.defineProperty(this, 'getPhoto', {value: getPhoto});
    return getPhoto
  }
  
  public get setEmail() {
    const setEmail = this.$apiClient.$makeCaller(
      this.$metadata.methods.setEmail,
      (c, newEmail: string | null) => c.setEmail(this.$primaryKey, newEmail),
      () => ({newEmail: null as string | null, }),
      (c, args) => c.setEmail(this.$primaryKey, args.newEmail))
    
    Object.defineProperty(this, 'setEmail', {value: setEmail});
    return setEmail
  }
  
  public get sendEmailConfirmation() {
    const sendEmailConfirmation = this.$apiClient.$makeCaller(
      this.$metadata.methods.sendEmailConfirmation,
      (c) => c.sendEmailConfirmation(this.$primaryKey),
      () => ({}),
      (c, args) => c.sendEmailConfirmation(this.$primaryKey))
    
    Object.defineProperty(this, 'sendEmailConfirmation', {value: sendEmailConfirmation});
    return sendEmailConfirmation
  }
  
  public get setPassword() {
    const setPassword = this.$apiClient.$makeCaller(
      this.$metadata.methods.setPassword,
      (c, currentPassword: string | null, newPassword: string | null, confirmNewPassword: string | null) => c.setPassword(this.$primaryKey, currentPassword, newPassword, confirmNewPassword),
      () => ({currentPassword: null as string | null, newPassword: null as string | null, confirmNewPassword: null as string | null, }),
      (c, args) => c.setPassword(this.$primaryKey, args.currentPassword, args.newPassword, args.confirmNewPassword))
    
    Object.defineProperty(this, 'setPassword', {value: setPassword});
    return setPassword
  }
  
  constructor(initialData?: DeepPartial<$models.User> | null) {
    super($metadata.User, new $apiClients.UserApiClient(), initialData)
  }
}
defineProps(UserViewModel, $metadata.User)

export class UserListViewModel extends ListViewModel<$models.User, $apiClients.UserApiClient, UserViewModel> {
  static DataSources = $models.User.DataSources;
  
  constructor() {
    super($metadata.User, new $apiClients.UserApiClient())
  }
}


export interface UserRoleViewModel extends $models.UserRole {
  id: string | null;
  get user(): UserViewModel | null;
  set user(value: UserViewModel | $models.User | null);
  get role(): RoleViewModel | null;
  set role(value: RoleViewModel | $models.Role | null);
  userId: string | null;
  roleId: string | null;
}
export class UserRoleViewModel extends ViewModel<$models.UserRole, $apiClients.UserRoleApiClient, string> implements $models.UserRole  {
  static DataSources = $models.UserRole.DataSources;
  
  constructor(initialData?: DeepPartial<$models.UserRole> | null) {
    super($metadata.UserRole, new $apiClients.UserRoleApiClient(), initialData)
  }
}
defineProps(UserRoleViewModel, $metadata.UserRole)

export class UserRoleListViewModel extends ListViewModel<$models.UserRole, $apiClients.UserRoleApiClient, UserRoleViewModel> {
  static DataSources = $models.UserRole.DataSources;
  
  constructor() {
    super($metadata.UserRole, new $apiClients.UserRoleApiClient())
  }
}


export interface UserWorkoutViewModel extends $models.UserWorkout {
  userWorkoutId: number | null;
  userId: string | null;
  get user(): UserViewModel | null;
  set user(value: UserViewModel | $models.User | null);
  name: string | null;
  workout: string | null;
  get modifiedBy(): UserViewModel | null;
  set modifiedBy(value: UserViewModel | $models.User | null);
  modifiedById: string | null;
  modifiedOn: Date | null;
  get createdBy(): UserViewModel | null;
  set createdBy(value: UserViewModel | $models.User | null);
  createdById: string | null;
  createdOn: Date | null;
}
export class UserWorkoutViewModel extends ViewModel<$models.UserWorkout, $apiClients.UserWorkoutApiClient, number> implements $models.UserWorkout  {
  
  constructor(initialData?: DeepPartial<$models.UserWorkout> | null) {
    super($metadata.UserWorkout, new $apiClients.UserWorkoutApiClient(), initialData)
  }
}
defineProps(UserWorkoutViewModel, $metadata.UserWorkout)

export class UserWorkoutListViewModel extends ListViewModel<$models.UserWorkout, $apiClients.UserWorkoutApiClient, UserWorkoutViewModel> {
  
  public get saveWorkout() {
    const saveWorkout = this.$apiClient.$makeCaller(
      this.$metadata.methods.saveWorkout,
      (c, name: string | null, workout: string | null) => c.saveWorkout(name, workout),
      () => ({name: null as string | null, workout: null as string | null, }),
      (c, args) => c.saveWorkout(args.name, args.workout))
    
    Object.defineProperty(this, 'saveWorkout', {value: saveWorkout});
    return saveWorkout
  }
  
  constructor() {
    super($metadata.UserWorkout, new $apiClients.UserWorkoutApiClient())
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
      (c, workoutRequest: string | null) => c.generateWorkout(workoutRequest),
      () => ({workoutRequest: null as string | null, }),
      (c, args) => c.generateWorkout(args.workoutRequest))
    
    Object.defineProperty(this, 'generateWorkout', {value: generateWorkout});
    return generateWorkout
  }
  
  constructor() {
    super($metadata.WorkoutService, new $apiClients.WorkoutServiceApiClient())
  }
}


const viewModelTypeLookup = ViewModel.typeLookup = {
  Role: RoleViewModel,
  User: UserViewModel,
  UserRole: UserRoleViewModel,
  UserWorkout: UserWorkoutViewModel,
}
const listViewModelTypeLookup = ListViewModel.typeLookup = {
  Role: RoleListViewModel,
  User: UserListViewModel,
  UserRole: UserRoleListViewModel,
  UserWorkout: UserWorkoutListViewModel,
}
const serviceViewModelTypeLookup = ServiceViewModel.typeLookup = {
  SecurityService: SecurityServiceViewModel,
  WorkoutService: WorkoutServiceViewModel,
}

