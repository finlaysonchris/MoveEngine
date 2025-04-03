import { getEnumMeta, solidify } from 'coalesce-vue/lib/metadata'
import type {
  Domain, ModelType, ObjectType, HiddenAreas, BehaviorFlags, 
  PrimitiveProperty, ForeignKeyProperty, PrimaryKeyProperty,
  ModelCollectionNavigationProperty, ModelReferenceNavigationProperty
} from 'coalesce-vue/lib/metadata'


const domain: Domain = { enums: {}, types: {}, services: {} }
export const Permission = domain.enums.Permission = {
  name: "Permission" as const,
  displayName: "Permission",
  type: "enum",
  ...getEnumMeta<"Admin"|"UserAdmin"|"ViewAuditLogs">([
  {
    value: 1,
    strValue: "Admin",
    displayName: "Admin - General",
    description: "Modify application configuration and other administrative functions excluding user/role management.",
  },
  {
    value: 2,
    strValue: "UserAdmin",
    displayName: "Admin - Users",
    description: "Add and modify users accounts and their assigned roles. Edit roles and their permissions.",
  },
  {
    value: 3,
    strValue: "ViewAuditLogs",
    displayName: "View Audit Logs",
  },
  ]),
}
export const Role = domain.types.Role = {
  name: "Role" as const,
  displayName: "Role",
  description: "Roles are groups of permissions, analogous to job titles or functions.",
  get displayProp() { return this.props.name }, 
  type: "model",
  controllerRoute: "Role",
  get keyProp() { return this.props.id }, 
  behaviorFlags: 7 as BehaviorFlags,
  props: {
    name: {
      name: "name",
      displayName: "Name",
      type: "string",
      role: "value",
      rules: {
        required: val => (val != null && val !== '') || "Name is required.",
      }
    },
    permissions: {
      name: "permissions",
      displayName: "Permissions",
      type: "collection",
      itemType: {
        name: "$collectionItem",
        displayName: "",
        role: "value",
        type: "enum",
        get typeDef() { return Permission },
      },
      role: "value",
    },
    id: {
      name: "id",
      displayName: "Id",
      type: "string",
      role: "primaryKey",
      hidden: 3 as HiddenAreas,
    },
  },
  methods: {
  },
  dataSources: {
  },
}
export const User = domain.types.User = {
  name: "User" as const,
  displayName: "User",
  description: "A user profile within the application.",
  get displayProp() { return this.props.fullName }, 
  type: "model",
  controllerRoute: "User",
  get keyProp() { return this.props.id }, 
  behaviorFlags: 2 as BehaviorFlags,
  props: {
    fullName: {
      name: "fullName",
      displayName: "Full Name",
      type: "string",
      role: "value",
    },
    userName: {
      name: "userName",
      displayName: "User Name",
      type: "string",
      role: "value",
    },
    email: {
      name: "email",
      displayName: "Email",
      type: "string",
      role: "value",
      dontSerialize: true,
    },
    emailConfirmed: {
      name: "emailConfirmed",
      displayName: "Email Confirmed",
      type: "boolean",
      role: "value",
      dontSerialize: true,
    },
    photoHash: {
      name: "photoHash",
      displayName: "Photo Hash",
      type: "binary",
      base64: true,
      role: "value",
      hidden: 3 as HiddenAreas,
      dontSerialize: true,
    },
    lockoutEnd: {
      name: "lockoutEnd",
      displayName: "Lockout End",
      description: "If set, the user will be blocked from signing in until this date.",
      type: "date",
      dateKind: "datetime",
      role: "value",
    },
    lockoutEnabled: {
      name: "lockoutEnabled",
      displayName: "Lockout Enabled",
      description: "If enabled, the user can be locked out.",
      type: "boolean",
      role: "value",
    },
    userRoles: {
      name: "userRoles",
      displayName: "User Roles",
      type: "collection",
      itemType: {
        name: "$collectionItem",
        displayName: "",
        role: "value",
        type: "model",
        get typeDef() { return (domain.types.UserRole as ModelType & { name: "UserRole" }) },
      },
      role: "collectionNavigation",
      get foreignKey() { return (domain.types.UserRole as ModelType & { name: "UserRole" }).props.userId as ForeignKeyProperty },
      get inverseNavigation() { return (domain.types.UserRole as ModelType & { name: "UserRole" }).props.user as ModelReferenceNavigationProperty },
      manyToMany: {
        name: "roles",
        displayName: "Roles",
        get typeDef() { return (domain.types.Role as ModelType & { name: "Role" }) },
        get farForeignKey() { return (domain.types.UserRole as ModelType & { name: "UserRole" }).props.roleId as ForeignKeyProperty },
        get farNavigationProp() { return (domain.types.UserRole as ModelType & { name: "UserRole" }).props.role as ModelReferenceNavigationProperty },
        get nearForeignKey() { return (domain.types.UserRole as ModelType & { name: "UserRole" }).props.userId as ForeignKeyProperty },
        get nearNavigationProp() { return (domain.types.UserRole as ModelType & { name: "UserRole" }).props.user as ModelReferenceNavigationProperty },
      },
      hidden: 3 as HiddenAreas,
      dontSerialize: true,
    },
    roleNames: {
      name: "roleNames",
      displayName: "Roles",
      type: "collection",
      itemType: {
        name: "$collectionItem",
        displayName: "",
        role: "value",
        type: "string",
      },
      role: "value",
      dontSerialize: true,
    },
    id: {
      name: "id",
      displayName: "Id",
      type: "string",
      role: "primaryKey",
      hidden: 3 as HiddenAreas,
    },
  },
  methods: {
    getPhoto: {
      name: "getPhoto",
      displayName: "Get Photo",
      transportType: "item",
      httpMethod: "GET",
      params: {
        id: {
          name: "id",
          displayName: "Primary Key",
          type: "string",
          role: "value",
          get source() { return (domain.types.User as ModelType & { name: "User" }).props.id },
          rules: {
            required: val => (val != null && val !== '') || "Primary Key is required.",
          }
        },
        etag: {
          name: "etag",
          displayName: "Etag",
          type: "binary",
          role: "value",
          get source() { return (domain.types.User as ModelType & { name: "User" }).props.photoHash },
        },
      },
      return: {
        name: "$return",
        displayName: "Result",
        type: "file",
        role: "value",
      },
    },
    setEmail: {
      name: "setEmail",
      displayName: "Set Email",
      transportType: "item",
      httpMethod: "POST",
      params: {
        id: {
          name: "id",
          displayName: "Primary Key",
          type: "string",
          role: "value",
          get source() { return (domain.types.User as ModelType & { name: "User" }).props.id },
          rules: {
            required: val => (val != null && val !== '') || "Primary Key is required.",
          }
        },
        newEmail: {
          name: "newEmail",
          displayName: "New Email",
          type: "string",
          subtype: "email",
          role: "value",
          rules: {
            required: val => (val != null && val !== '') || "New Email is required.",
          }
        },
      },
      return: {
        name: "$return",
        displayName: "Result",
        type: "void",
        role: "value",
      },
    },
    sendEmailConfirmation: {
      name: "sendEmailConfirmation",
      displayName: "Send Email Confirmation",
      transportType: "item",
      httpMethod: "POST",
      params: {
        id: {
          name: "id",
          displayName: "Primary Key",
          type: "string",
          role: "value",
          get source() { return (domain.types.User as ModelType & { name: "User" }).props.id },
          rules: {
            required: val => (val != null && val !== '') || "Primary Key is required.",
          }
        },
      },
      return: {
        name: "$return",
        displayName: "Result",
        type: "void",
        role: "value",
      },
    },
    setPassword: {
      name: "setPassword",
      displayName: "Set Password",
      transportType: "item",
      httpMethod: "POST",
      params: {
        id: {
          name: "id",
          displayName: "Primary Key",
          type: "string",
          role: "value",
          get source() { return (domain.types.User as ModelType & { name: "User" }).props.id },
          rules: {
            required: val => (val != null && val !== '') || "Primary Key is required.",
          }
        },
        currentPassword: {
          name: "currentPassword",
          displayName: "Current Password",
          type: "string",
          subtype: "password",
          role: "value",
        },
        newPassword: {
          name: "newPassword",
          displayName: "New Password",
          type: "string",
          subtype: "password",
          role: "value",
          rules: {
            required: val => (val != null && val !== '') || "New Password is required.",
          }
        },
        confirmNewPassword: {
          name: "confirmNewPassword",
          displayName: "Confirm New Password",
          type: "string",
          subtype: "password",
          role: "value",
          rules: {
            required: val => (val != null && val !== '') || "Confirm New Password is required.",
          }
        },
      },
      return: {
        name: "$return",
        displayName: "Result",
        type: "void",
        role: "value",
      },
    },
  },
  dataSources: {
    defaultSource: {
      type: "dataSource",
      name: "DefaultSource" as const,
      displayName: "Default Source",
      isDefault: true,
      props: {
      },
    },
  },
}
export const UserRole = domain.types.UserRole = {
  name: "UserRole" as const,
  displayName: "User Role",
  get displayProp() { return this.props.id }, 
  type: "model",
  controllerRoute: "UserRole",
  get keyProp() { return this.props.id }, 
  behaviorFlags: 5 as BehaviorFlags,
  props: {
    id: {
      name: "id",
      displayName: "Id",
      type: "string",
      role: "primaryKey",
      hidden: 3 as HiddenAreas,
    },
    user: {
      name: "user",
      displayName: "User",
      type: "model",
      get typeDef() { return (domain.types.User as ModelType & { name: "User" }) },
      role: "referenceNavigation",
      get foreignKey() { return (domain.types.UserRole as ModelType & { name: "UserRole" }).props.userId as ForeignKeyProperty },
      get principalKey() { return (domain.types.User as ModelType & { name: "User" }).props.id as PrimaryKeyProperty },
      get inverseNavigation() { return (domain.types.User as ModelType & { name: "User" }).props.userRoles as ModelCollectionNavigationProperty },
      dontSerialize: true,
    },
    role: {
      name: "role",
      displayName: "Role",
      type: "model",
      get typeDef() { return (domain.types.Role as ModelType & { name: "Role" }) },
      role: "referenceNavigation",
      get foreignKey() { return (domain.types.UserRole as ModelType & { name: "UserRole" }).props.roleId as ForeignKeyProperty },
      get principalKey() { return (domain.types.Role as ModelType & { name: "Role" }).props.id as PrimaryKeyProperty },
      dontSerialize: true,
    },
    userId: {
      name: "userId",
      displayName: "User Id",
      type: "string",
      role: "foreignKey",
      get principalKey() { return (domain.types.User as ModelType & { name: "User" }).props.id as PrimaryKeyProperty },
      get principalType() { return (domain.types.User as ModelType & { name: "User" }) },
      get navigationProp() { return (domain.types.UserRole as ModelType & { name: "UserRole" }).props.user as ModelReferenceNavigationProperty },
      hidden: 3 as HiddenAreas,
      rules: {
        required: val => (val != null && val !== '') || "User is required.",
      }
    },
    roleId: {
      name: "roleId",
      displayName: "Role Id",
      type: "string",
      role: "foreignKey",
      get principalKey() { return (domain.types.Role as ModelType & { name: "Role" }).props.id as PrimaryKeyProperty },
      get principalType() { return (domain.types.Role as ModelType & { name: "Role" }) },
      get navigationProp() { return (domain.types.UserRole as ModelType & { name: "UserRole" }).props.role as ModelReferenceNavigationProperty },
      hidden: 3 as HiddenAreas,
      rules: {
        required: val => (val != null && val !== '') || "Role is required.",
      }
    },
  },
  methods: {
  },
  dataSources: {
    defaultSource: {
      type: "dataSource",
      name: "DefaultSource" as const,
      displayName: "Default Source",
      isDefault: true,
      props: {
      },
    },
  },
}
export const UserWorkout = domain.types.UserWorkout = {
  name: "UserWorkout" as const,
  displayName: "User Workout",
  get displayProp() { return this.props.name }, 
  type: "model",
  controllerRoute: "UserWorkout",
  get keyProp() { return this.props.userWorkoutId }, 
  behaviorFlags: 7 as BehaviorFlags,
  props: {
    userWorkoutId: {
      name: "userWorkoutId",
      displayName: "User Workout Id",
      type: "number",
      role: "primaryKey",
      hidden: 3 as HiddenAreas,
    },
    userId: {
      name: "userId",
      displayName: "User Id",
      type: "string",
      role: "foreignKey",
      get principalKey() { return (domain.types.User as ModelType & { name: "User" }).props.id as PrimaryKeyProperty },
      get principalType() { return (domain.types.User as ModelType & { name: "User" }) },
      get navigationProp() { return (domain.types.UserWorkout as ModelType & { name: "UserWorkout" }).props.user as ModelReferenceNavigationProperty },
      hidden: 3 as HiddenAreas,
      rules: {
        required: val => (val != null && val !== '') || "User is required.",
      }
    },
    user: {
      name: "user",
      displayName: "User",
      type: "model",
      get typeDef() { return (domain.types.User as ModelType & { name: "User" }) },
      role: "referenceNavigation",
      get foreignKey() { return (domain.types.UserWorkout as ModelType & { name: "UserWorkout" }).props.userId as ForeignKeyProperty },
      get principalKey() { return (domain.types.User as ModelType & { name: "User" }).props.id as PrimaryKeyProperty },
      dontSerialize: true,
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
    workout: {
      name: "workout",
      displayName: "Workout",
      type: "string",
      role: "value",
      rules: {
        required: val => (val != null && val !== '') || "Workout is required.",
      }
    },
    modifiedById: {
      name: "modifiedById",
      displayName: "Modified By Id",
      type: "string",
      role: "foreignKey",
      get principalKey() { return (domain.types.User as ModelType & { name: "User" }).props.id as PrimaryKeyProperty },
      get principalType() { return (domain.types.User as ModelType & { name: "User" }) },
      get navigationProp() { return (domain.types.UserWorkout as ModelType & { name: "UserWorkout" }).props.modifiedBy as ModelReferenceNavigationProperty },
      hidden: 3 as HiddenAreas,
      dontSerialize: true,
    },
    createdById: {
      name: "createdById",
      displayName: "Created By Id",
      type: "string",
      role: "foreignKey",
      get principalKey() { return (domain.types.User as ModelType & { name: "User" }).props.id as PrimaryKeyProperty },
      get principalType() { return (domain.types.User as ModelType & { name: "User" }) },
      get navigationProp() { return (domain.types.UserWorkout as ModelType & { name: "UserWorkout" }).props.createdBy as ModelReferenceNavigationProperty },
      hidden: 3 as HiddenAreas,
      dontSerialize: true,
    },
    createdBy: {
      name: "createdBy",
      displayName: "Created By",
      type: "model",
      get typeDef() { return (domain.types.User as ModelType & { name: "User" }) },
      role: "referenceNavigation",
      get foreignKey() { return (domain.types.UserWorkout as ModelType & { name: "UserWorkout" }).props.createdById as ForeignKeyProperty },
      get principalKey() { return (domain.types.User as ModelType & { name: "User" }).props.id as PrimaryKeyProperty },
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
    modifiedBy: {
      name: "modifiedBy",
      displayName: "Modified By",
      type: "model",
      get typeDef() { return (domain.types.User as ModelType & { name: "User" }) },
      role: "referenceNavigation",
      get foreignKey() { return (domain.types.UserWorkout as ModelType & { name: "UserWorkout" }).props.modifiedById as ForeignKeyProperty },
      get principalKey() { return (domain.types.User as ModelType & { name: "User" }).props.id as PrimaryKeyProperty },
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
    saveWorkout: {
      name: "saveWorkout",
      displayName: "Save Workout",
      transportType: "item",
      httpMethod: "POST",
      isStatic: true,
      params: {
        name: {
          name: "name",
          displayName: "Name",
          type: "string",
          role: "value",
          rules: {
            required: val => (val != null && val !== '') || "Name is required.",
          }
        },
        workout: {
          name: "workout",
          displayName: "Workout",
          type: "string",
          role: "value",
          rules: {
            required: val => (val != null && val !== '') || "Workout is required.",
          }
        },
      },
      return: {
        name: "$return",
        displayName: "Result",
        type: "void",
        role: "value",
      },
    },
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
    email: {
      name: "email",
      displayName: "Email",
      type: "string",
      role: "value",
    },
    fullName: {
      name: "fullName",
      displayName: "Full Name",
      type: "string",
      role: "value",
    },
    roles: {
      name: "roles",
      displayName: "Roles",
      type: "collection",
      itemType: {
        name: "$collectionItem",
        displayName: "",
        role: "value",
        type: "string",
      },
      role: "value",
    },
    permissions: {
      name: "permissions",
      displayName: "Permissions",
      type: "collection",
      itemType: {
        name: "$collectionItem",
        displayName: "",
        role: "value",
        type: "string",
      },
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
    Permission: typeof Permission
  }
  types: {
    Role: typeof Role
    User: typeof User
    UserInfo: typeof UserInfo
    UserRole: typeof UserRole
    UserWorkout: typeof UserWorkout
  }
  services: {
    SecurityService: typeof SecurityService
    WorkoutService: typeof WorkoutService
  }
}

solidify(domain)

export default domain as unknown as AppDomain
