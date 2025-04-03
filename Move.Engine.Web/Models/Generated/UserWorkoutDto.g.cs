using IntelliTect.Coalesce;
using IntelliTect.Coalesce.Mapping;
using IntelliTect.Coalesce.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace Move.Engine.Web.Models
{
    public partial class UserWorkoutParameter : GeneratedParameterDto<Move.Engine.Data.Models.UserWorkout>
    {
        public UserWorkoutParameter() { }

        private int? _UserWorkoutId;
        private string _UserId;
        private string _Name;
        private string _Workout;

        public int? UserWorkoutId
        {
            get => _UserWorkoutId;
            set { _UserWorkoutId = value; Changed(nameof(UserWorkoutId)); }
        }
        public string UserId
        {
            get => _UserId;
            set { _UserId = value; Changed(nameof(UserId)); }
        }
        public string Name
        {
            get => _Name;
            set { _Name = value; Changed(nameof(Name)); }
        }
        public string Workout
        {
            get => _Workout;
            set { _Workout = value; Changed(nameof(Workout)); }
        }

        /// <summary>
        /// Map from the current DTO instance to the domain object.
        /// </summary>
        public override void MapTo(Move.Engine.Data.Models.UserWorkout entity, IMappingContext context)
        {
            var includes = context.Includes;

            if (OnUpdate(entity, context)) return;

            if (ShouldMapTo(nameof(UserWorkoutId))) entity.UserWorkoutId = (UserWorkoutId ?? entity.UserWorkoutId);
            if (ShouldMapTo(nameof(UserId))) entity.UserId = UserId;
            if (ShouldMapTo(nameof(Name))) entity.Name = Name;
            if (ShouldMapTo(nameof(Workout))) entity.Workout = Workout;
        }

        /// <summary>
        /// Map from the current DTO instance to a new instance of the domain object.
        /// </summary>
        public override Move.Engine.Data.Models.UserWorkout MapToNew(IMappingContext context)
        {
            var includes = context.Includes;

            var entity = new Move.Engine.Data.Models.UserWorkout()
            {
                UserId = UserId,
                Name = Name,
                Workout = Workout,
            };

            if (OnUpdate(entity, context)) return entity;
            if (ShouldMapTo(nameof(UserWorkoutId))) entity.UserWorkoutId = (UserWorkoutId ?? entity.UserWorkoutId);

            return entity;
        }
    }

    public partial class UserWorkoutResponse : GeneratedResponseDto<Move.Engine.Data.Models.UserWorkout>
    {
        public UserWorkoutResponse() { }

        public int? UserWorkoutId { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Workout { get; set; }
        public string ModifiedById { get; set; }
        public System.DateTimeOffset? ModifiedOn { get; set; }
        public string CreatedById { get; set; }
        public System.DateTimeOffset? CreatedOn { get; set; }
        public Move.Engine.Web.Models.UserResponse User { get; set; }
        public Move.Engine.Web.Models.UserResponse ModifiedBy { get; set; }
        public Move.Engine.Web.Models.UserResponse CreatedBy { get; set; }

        /// <summary>
        /// Map from the domain object to the properties of the current DTO instance.
        /// </summary>
        public override void MapFrom(Move.Engine.Data.Models.UserWorkout obj, IMappingContext context, IncludeTree tree = null)
        {
            if (obj == null) return;
            var includes = context.Includes;

            this.UserWorkoutId = obj.UserWorkoutId;
            this.UserId = obj.UserId;
            this.Name = obj.Name;
            this.Workout = obj.Workout;
            this.ModifiedById = obj.ModifiedById;
            this.ModifiedOn = obj.ModifiedOn;
            this.CreatedById = obj.CreatedById;
            this.CreatedOn = obj.CreatedOn;
            if (tree == null || tree[nameof(this.User)] != null)
                this.User = obj.User.MapToDto<Move.Engine.Data.Models.User, UserResponse>(context, tree?[nameof(this.User)]);

            if (tree == null || tree[nameof(this.ModifiedBy)] != null)
                this.ModifiedBy = obj.ModifiedBy.MapToDto<Move.Engine.Data.Models.User, UserResponse>(context, tree?[nameof(this.ModifiedBy)]);

            if (tree == null || tree[nameof(this.CreatedBy)] != null)
                this.CreatedBy = obj.CreatedBy.MapToDto<Move.Engine.Data.Models.User, UserResponse>(context, tree?[nameof(this.CreatedBy)]);

        }
    }
}
