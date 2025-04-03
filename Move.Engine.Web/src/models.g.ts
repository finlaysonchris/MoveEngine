import * as metadata from './metadata.g'
import { convertToModel, mapToModel, reactiveDataSource } from 'coalesce-vue/lib/model'
import type { Model, DataSource } from 'coalesce-vue/lib/model'

export enum Permission {
  
  /** Modify application configuration and other administrative functions excluding user/role management. */
  Admin = 1,
  
  /** Add and modify users accounts and their assigned roles. Edit roles and their permissions. */
  UserAdmin = 2,
  ViewAuditLogs = 3,
}


export interface Role extends Model<typeof metadata.Role> {
  name: string | null
  permissions: Permission[] | null
  id: string | null
}
export class Role {
  
  /** Mutates the input object and its descendents into a valid Role implementation. */
  static convert(data?: Partial<Role>): Role {
    return convertToModel(data || {}, metadata.Role) 
  }
  
  /** Maps the input object and its descendents to a new, valid Role implementation. */
  static map(data?: Partial<Role>): Role {
    return mapToModel(data || {}, metadata.Role) 
  }
  
  static [Symbol.hasInstance](x: any) { return x?.$metadata === metadata.Role; }
  
  /** Instantiate a new Role, optionally basing it on the given data. */
  constructor(data?: Partial<Role> | {[k: string]: any}) {
    Object.assign(this, Role.map(data || {}));
  }
}


export interface User extends Model<typeof metadata.User> {
  fullName: string | null
  userName: string | null
  email: string | null
  emailConfirmed: boolean | null
  photoHash: string | null
  
  /** If set, the user will be blocked from signing in until this date. */
  lockoutEnd: Date | null
  
  /** If enabled, the user can be locked out. */
  lockoutEnabled: boolean | null
  userRoles: UserRole[] | null
  roleNames: string[] | null
  id: string | null
}
export class User {
  
  /** Mutates the input object and its descendents into a valid User implementation. */
  static convert(data?: Partial<User>): User {
    return convertToModel(data || {}, metadata.User) 
  }
  
  /** Maps the input object and its descendents to a new, valid User implementation. */
  static map(data?: Partial<User>): User {
    return mapToModel(data || {}, metadata.User) 
  }
  
  static [Symbol.hasInstance](x: any) { return x?.$metadata === metadata.User; }
  
  /** Instantiate a new User, optionally basing it on the given data. */
  constructor(data?: Partial<User> | {[k: string]: any}) {
    Object.assign(this, User.map(data || {}));
  }
}
export namespace User {
  export namespace DataSources {
    
    export class DefaultSource implements DataSource<typeof metadata.User.dataSources.defaultSource> {
      readonly $metadata = metadata.User.dataSources.defaultSource
    }
  }
}


export interface UserRole extends Model<typeof metadata.UserRole> {
  id: string | null
  user: User | null
  role: Role | null
  userId: string | null
  roleId: string | null
}
export class UserRole {
  
  /** Mutates the input object and its descendents into a valid UserRole implementation. */
  static convert(data?: Partial<UserRole>): UserRole {
    return convertToModel(data || {}, metadata.UserRole) 
  }
  
  /** Maps the input object and its descendents to a new, valid UserRole implementation. */
  static map(data?: Partial<UserRole>): UserRole {
    return mapToModel(data || {}, metadata.UserRole) 
  }
  
  static [Symbol.hasInstance](x: any) { return x?.$metadata === metadata.UserRole; }
  
  /** Instantiate a new UserRole, optionally basing it on the given data. */
  constructor(data?: Partial<UserRole> | {[k: string]: any}) {
    Object.assign(this, UserRole.map(data || {}));
  }
}
export namespace UserRole {
  export namespace DataSources {
    
    export class DefaultSource implements DataSource<typeof metadata.UserRole.dataSources.defaultSource> {
      readonly $metadata = metadata.UserRole.dataSources.defaultSource
    }
  }
}


export interface UserWorkout extends Model<typeof metadata.UserWorkout> {
  userWorkoutId: number | null
  userId: string | null
  user: User | null
  name: string | null
  workout: string | null
  modifiedBy: User | null
  modifiedById: string | null
  modifiedOn: Date | null
  createdBy: User | null
  createdById: string | null
  createdOn: Date | null
}
export class UserWorkout {
  
  /** Mutates the input object and its descendents into a valid UserWorkout implementation. */
  static convert(data?: Partial<UserWorkout>): UserWorkout {
    return convertToModel(data || {}, metadata.UserWorkout) 
  }
  
  /** Maps the input object and its descendents to a new, valid UserWorkout implementation. */
  static map(data?: Partial<UserWorkout>): UserWorkout {
    return mapToModel(data || {}, metadata.UserWorkout) 
  }
  
  static [Symbol.hasInstance](x: any) { return x?.$metadata === metadata.UserWorkout; }
  
  /** Instantiate a new UserWorkout, optionally basing it on the given data. */
  constructor(data?: Partial<UserWorkout> | {[k: string]: any}) {
    Object.assign(this, UserWorkout.map(data || {}));
  }
}


export interface UserInfo extends Model<typeof metadata.UserInfo> {
  id: string | null
  userName: string | null
  email: string | null
  fullName: string | null
  roles: string[] | null
  permissions: string[] | null
}
export class UserInfo {
  
  /** Mutates the input object and its descendents into a valid UserInfo implementation. */
  static convert(data?: Partial<UserInfo>): UserInfo {
    return convertToModel(data || {}, metadata.UserInfo) 
  }
  
  /** Maps the input object and its descendents to a new, valid UserInfo implementation. */
  static map(data?: Partial<UserInfo>): UserInfo {
    return mapToModel(data || {}, metadata.UserInfo) 
  }
  
  static [Symbol.hasInstance](x: any) { return x?.$metadata === metadata.UserInfo; }
  
  /** Instantiate a new UserInfo, optionally basing it on the given data. */
  constructor(data?: Partial<UserInfo> | {[k: string]: any}) {
    Object.assign(this, UserInfo.map(data || {}));
  }
}


declare module "coalesce-vue/lib/model" {
  interface EnumTypeLookup {
    Permission: Permission
  }
  interface ModelTypeLookup {
    Role: Role
    User: User
    UserInfo: UserInfo
    UserRole: UserRole
    UserWorkout: UserWorkout
  }
}
