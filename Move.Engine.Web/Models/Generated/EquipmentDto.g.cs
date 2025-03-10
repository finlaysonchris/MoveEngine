using IntelliTect.Coalesce;
using IntelliTect.Coalesce.Mapping;
using IntelliTect.Coalesce.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace Move.Engine.Web.Models
{
    public partial class EquipmentParameter : GeneratedParameterDto<Move.Engine.Data.Models.Equipment>
    {
        public EquipmentParameter() { }

        private int? _EquipmentId;
        private string _Name;
        private string _Icon;

        public int? EquipmentId
        {
            get => _EquipmentId;
            set { _EquipmentId = value; Changed(nameof(EquipmentId)); }
        }
        public string Name
        {
            get => _Name;
            set { _Name = value; Changed(nameof(Name)); }
        }
        public string Icon
        {
            get => _Icon;
            set { _Icon = value; Changed(nameof(Icon)); }
        }

        /// <summary>
        /// Map from the current DTO instance to the domain object.
        /// </summary>
        public override void MapTo(Move.Engine.Data.Models.Equipment entity, IMappingContext context)
        {
            var includes = context.Includes;

            if (OnUpdate(entity, context)) return;

            if (ShouldMapTo(nameof(EquipmentId))) entity.EquipmentId = (EquipmentId ?? entity.EquipmentId);
            if (ShouldMapTo(nameof(Name))) entity.Name = Name;
            if (ShouldMapTo(nameof(Icon))) entity.Icon = Icon;
        }

        /// <summary>
        /// Map from the current DTO instance to a new instance of the domain object.
        /// </summary>
        public override Move.Engine.Data.Models.Equipment MapToNew(IMappingContext context)
        {
            var includes = context.Includes;

            var entity = new Move.Engine.Data.Models.Equipment()
            {
                Name = Name,
                Icon = Icon,
            };

            if (OnUpdate(entity, context)) return entity;
            if (ShouldMapTo(nameof(EquipmentId))) entity.EquipmentId = (EquipmentId ?? entity.EquipmentId);

            return entity;
        }
    }

    public partial class EquipmentResponse : GeneratedResponseDto<Move.Engine.Data.Models.Equipment>
    {
        public EquipmentResponse() { }

        public int? EquipmentId { get; set; }
        public string Name { get; set; }
        public string Icon { get; set; }
        public string ModifiedById { get; set; }
        public System.DateTimeOffset? ModifiedOn { get; set; }
        public string CreatedById { get; set; }
        public System.DateTimeOffset? CreatedOn { get; set; }

        /// <summary>
        /// Map from the domain object to the properties of the current DTO instance.
        /// </summary>
        public override void MapFrom(Move.Engine.Data.Models.Equipment obj, IMappingContext context, IncludeTree tree = null)
        {
            if (obj == null) return;
            var includes = context.Includes;

            this.EquipmentId = obj.EquipmentId;
            this.Name = obj.Name;
            this.Icon = obj.Icon;
            this.ModifiedById = obj.ModifiedById;
            this.ModifiedOn = obj.ModifiedOn;
            this.CreatedById = obj.CreatedById;
            this.CreatedOn = obj.CreatedOn;
        }
    }
}
