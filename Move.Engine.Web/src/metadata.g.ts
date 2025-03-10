import { getEnumMeta, solidify } from 'coalesce-vue/lib/metadata'
import type {
  Domain, ModelType, ObjectType, HiddenAreas, BehaviorFlags, 
  PrimitiveProperty, ForeignKeyProperty, PrimaryKeyProperty,
  ModelCollectionNavigationProperty, ModelReferenceNavigationProperty
} from 'coalesce-vue/lib/metadata'


const domain: Domain = { enums: {}, types: {}, services: {} }
export const Equipment = domain.types.Equipment = {
  name: "Equipment" as const,
  displayName: "Equipment",
  description: "A sample model provided by the Coalesce template. Remove this when you start building your real data model.",
  get displayProp() { return this.props.name }, 
  type: "model",
  controllerRoute: "Equipment",
  get keyProp() { return this.props.equipmentId }, 
  behaviorFlags: 7 as BehaviorFlags,
  props: {
    equipmentId: {
      name: "equipmentId",
      displayName: "Equipment Id",
      type: "number",
      role: "primaryKey",
      hidden: 3 as HiddenAreas,
    },
    name: {
      name: "name",
      displayName: "Name",
      type: "string",
      role: "value",
      rules: {
        required: val => (val != null && val !== '') || "Name is required.",
      }
    },
    icon: {
      name: "icon",
      displayName: "Icon",
      type: "string",
      role: "value",
      rules: {
        required: val => (val != null && val !== '') || "Icon is required.",
      }
    },
    modifiedById: {
      name: "modifiedById",
      displayName: "Modified By Id",
      type: "string",
      role: "value",
      dontSerialize: true,
    },
    createdById: {
      name: "createdById",
      displayName: "Created By Id",
      type: "string",
      role: "value",
      dontSerialize: true,
    },
    createdOn: {
      name: "createdOn",
      displayName: "Created On",
      type: "date",
      dateKind: "datetime",
      role: "value",
      dontSerialize: true,
    },
    modifiedOn: {
      name: "modifiedOn",
      displayName: "Modified On",
      type: "date",
      dateKind: "datetime",
      role: "value",
      dontSerialize: true,
    },
  },
  methods: {
  },
  dataSources: {
  },
}
export const UserInfo = domain.types.UserInfo = {
  name: "UserInfo" as const,
  displayName: "User Info",
  type: "object",
  props: {
    id: {
      name: "id",
      displayName: "Id",
      type: "string",
      role: "value",
    },
    userName: {
      name: "userName",
      displayName: "User Name",
      type: "string",
      role: "value",
    },
  },
}
export const SecurityService = domain.services.SecurityService = {
  name: "SecurityService",
  displayName: "Security Service",
  type: "service",
  controllerRoute: "SecurityService",
  methods: {
    whoAmI: {
      name: "whoAmI",
      displayName: "Who AmI",
      transportType: "item",
      httpMethod: "GET",
      params: {
      },
      return: {
        name: "$return",
        displayName: "Result",
        type: "object",
        get typeDef() { return (domain.types.UserInfo as ObjectType & { name: "UserInfo" }) },
        role: "value",
      },
    },
  },
}
export const WorkoutService = domain.services.WorkoutService = {
  name: "WorkoutService",
  displayName: "Workout Service",
  type: "service",
  controllerRoute: "WorkoutService",
  methods: {
    generateWorkout: {
      name: "generateWorkout",
      displayName: "Generate Workout",
      transportType: "item",
      httpMethod: "POST",
      params: {
        workoutRequest: {
          name: "workoutRequest",
          displayName: "Workout Request",
          type: "string",
          role: "value",
          rules: {
            required: val => (val != null && val !== '') || "Workout Request is required.",
          }
        },
      },
      return: {
        name: "$return",
        displayName: "Result",
        type: "string",
        role: "value",
      },
    },
  },
}

interface AppDomain extends Domain {
  enums: {
  }
  types: {
    Equipment: typeof Equipment
    UserInfo: typeof UserInfo
  }
  services: {
    SecurityService: typeof SecurityService
    WorkoutService: typeof WorkoutService
  }
}

solidify(domain)

export default domain as unknown as AppDomain
