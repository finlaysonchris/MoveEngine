import * as metadata from './metadata.g'
import { convertToModel, mapToModel, reactiveDataSource } from 'coalesce-vue/lib/model'
import type { Model, DataSource } from 'coalesce-vue/lib/model'

export interface Equipment extends Model<typeof metadata.Equipment> {
  equipmentId: number | null
  name: string | null
  icon: string | null
  modifiedById: string | null
  modifiedOn: Date | null
  createdById: string | null
  createdOn: Date | null
}
export class Equipment {
  
  /** Mutates the input object and its descendents into a valid Equipment implementation. */
  static convert(data?: Partial<Equipment>): Equipment {
    return convertToModel(data || {}, metadata.Equipment) 
  }
  
  /** Maps the input object and its descendents to a new, valid Equipment implementation. */
  static map(data?: Partial<Equipment>): Equipment {
    return mapToModel(data || {}, metadata.Equipment) 
  }
  
  static [Symbol.hasInstance](x: any) { return x?.$metadata === metadata.Equipment; }
  
  /** Instantiate a new Equipment, optionally basing it on the given data. */
  constructor(data?: Partial<Equipment> | {[k: string]: any}) {
    Object.assign(this, Equipment.map(data || {}));
  }
}


export interface UserInfo extends Model<typeof metadata.UserInfo> {
  id: string | null
  userName: string | null
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
  }
  interface ModelTypeLookup {
    Equipment: Equipment
    UserInfo: UserInfo
  }
}
