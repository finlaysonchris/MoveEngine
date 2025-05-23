using IntelliTect.Coalesce;
using IntelliTect.Coalesce.Mapping;
using IntelliTect.Coalesce.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace Move.Engine.Web.Models
{
    public partial class UserRoleParameter : GeneratedParameterDto<Move.Engine.Data.Models.UserRole>
    {
        public UserRoleParameter() { }

        private string _Id;
        private string _UserId;
        private string _RoleId;

        public string Id
        {
            get => _Id;
            set { _Id = value; Changed(nameof(Id)); }
        }
        public string UserId
        {
            get => _UserId;
            set { _UserId = value; Changed(nameof(UserId)); }
        }
        public string RoleId
        {
            get => _RoleId;
            set { _RoleId = value; Changed(nameof(RoleId)); }
        }

        /// <summary>
        /// Map from the current DTO instance to the domain object.
        /// </summary>
        public override void MapTo(Move.Engine.Data.Models.UserRole entity, IMappingContext context)
        {
            var includes = context.Includes;

            if (OnUpdate(entity, context)) return;

            if (ShouldMapTo(nameof(Id))) entity.Id = Id;
            if (ShouldMapTo(nameof(UserId))) entity.UserId = UserId;
            if (ShouldMapTo(nameof(RoleId))) entity.RoleId = RoleId;
        }

        /// <summary>
        /// Map from the current DTO instance to a new instance of the domain object.
        /// </summary>
        public override Move.Engine.Data.Models.UserRole MapToNew(IMappingContext context)
        {
            var entity = new Move.Engine.Data.Models.UserRole();
            MapTo(entity, context);
            return entity;
        }
    }

    public partial class UserRoleResponse : GeneratedResponseDto<Move.Engine.Data.Models.UserRole>
    {
        public UserRoleResponse() { }

        public string Id { get; set; }
        public string UserId { get; set; }
        public string RoleId { get; set; }
        public Move.Engine.Web.Models.UserResponse User { get; set; }
        public Move.Engine.Web.Models.RoleResponse Role { get; set; }

        /// <summary>
        /// Map from the domain object to the properties of the current DTO instance.
        /// </summary>
        public override void MapFrom(Move.Engine.Data.Models.UserRole obj, IMappingContext context, IncludeTree tree = null)
        {
            if (obj == null) return;
            var includes = context.Includes;

            this.Id = obj.Id;
            this.UserId = obj.UserId;
            this.RoleId = obj.RoleId;
            if (tree == null || tree[nameof(this.User)] != null)
                this.User = obj.User.MapToDto<Move.Engine.Data.Models.User, UserResponse>(context, tree?[nameof(this.User)]);

            if (tree == null || tree[nameof(this.Role)] != null)
                this.Role = obj.Role.MapToDto<Move.Engine.Data.Models.Role, RoleResponse>(context, tree?[nameof(this.Role)]);

        }
    }
}
