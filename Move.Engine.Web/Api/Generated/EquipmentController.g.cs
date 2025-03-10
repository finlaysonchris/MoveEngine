
using IntelliTect.Coalesce;
using IntelliTect.Coalesce.Api;
using IntelliTect.Coalesce.Api.Behaviors;
using IntelliTect.Coalesce.Api.Controllers;
using IntelliTect.Coalesce.Api.DataSources;
using IntelliTect.Coalesce.Mapping;
using IntelliTect.Coalesce.Mapping.IncludeTrees;
using IntelliTect.Coalesce.Models;
using IntelliTect.Coalesce.TypeDefinition;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Move.Engine.Web.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Move.Engine.Web.Api
{
    [Route("api/Equipment")]
    [Authorize]
    [ServiceFilter(typeof(IApiActionFilter))]
    public partial class EquipmentController
        : BaseApiController<Move.Engine.Data.Models.Equipment, EquipmentParameter, EquipmentResponse, Move.Engine.Data.AppDbContext>
    {
        public EquipmentController(CrudContext<Move.Engine.Data.AppDbContext> context) : base(context)
        {
            GeneratedForClassViewModel = context.ReflectionRepository.GetClassViewModel<Move.Engine.Data.Models.Equipment>();
        }

        [HttpGet("get/{id}")]
        [Authorize]
        public virtual Task<ItemResult<EquipmentResponse>> Get(
            int id,
            [FromQuery] DataSourceParameters parameters,
            IDataSource<Move.Engine.Data.Models.Equipment> dataSource)
            => GetImplementation(id, parameters, dataSource);

        [HttpGet("list")]
        [Authorize]
        public virtual Task<ListResult<EquipmentResponse>> List(
            [FromQuery] ListParameters parameters,
            IDataSource<Move.Engine.Data.Models.Equipment> dataSource)
            => ListImplementation(parameters, dataSource);

        [HttpGet("count")]
        [Authorize]
        public virtual Task<ItemResult<int>> Count(
            [FromQuery] FilterParameters parameters,
            IDataSource<Move.Engine.Data.Models.Equipment> dataSource)
            => CountImplementation(parameters, dataSource);

        [HttpPost("save")]
        [Consumes("application/x-www-form-urlencoded", "multipart/form-data")]
        [Authorize]
        public virtual Task<ItemResult<EquipmentResponse>> Save(
            [FromForm] EquipmentParameter dto,
            [FromQuery] DataSourceParameters parameters,
            IDataSource<Move.Engine.Data.Models.Equipment> dataSource,
            IBehaviors<Move.Engine.Data.Models.Equipment> behaviors)
            => SaveImplementation(dto, parameters, dataSource, behaviors);

        [HttpPost("save")]
        [Consumes("application/json")]
        [Authorize]
        public virtual Task<ItemResult<EquipmentResponse>> SaveFromJson(
            [FromBody] EquipmentParameter dto,
            [FromQuery] DataSourceParameters parameters,
            IDataSource<Move.Engine.Data.Models.Equipment> dataSource,
            IBehaviors<Move.Engine.Data.Models.Equipment> behaviors)
            => SaveImplementation(dto, parameters, dataSource, behaviors);

        [HttpPost("bulkSave")]
        [Authorize]
        public virtual Task<ItemResult<EquipmentResponse>> BulkSave(
            [FromBody] BulkSaveRequest dto,
            [FromQuery] DataSourceParameters parameters,
            IDataSource<Move.Engine.Data.Models.Equipment> dataSource,
            [FromServices] IDataSourceFactory dataSourceFactory,
            [FromServices] IBehaviorsFactory behaviorsFactory)
            => BulkSaveImplementation(dto, parameters, dataSource, dataSourceFactory, behaviorsFactory);

        [HttpPost("delete/{id}")]
        [Authorize]
        public virtual Task<ItemResult<EquipmentResponse>> Delete(
            int id,
            IBehaviors<Move.Engine.Data.Models.Equipment> behaviors,
            IDataSource<Move.Engine.Data.Models.Equipment> dataSource)
            => DeleteImplementation(id, new DataSourceParameters(), dataSource, behaviors);
    }
}
