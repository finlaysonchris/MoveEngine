
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
using MoveEngine.Web.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace MoveEngine.Web.Api
{
    [Route("api/Role")]
    [Authorize]
    [ServiceFilter(typeof(IApiActionFilter))]
    public partial class RoleController
        : BaseApiController<MoveEngine.Data.Models.Role, RoleParameter, RoleResponse, MoveEngine.Data.AppDbContext>
    {
        public RoleController(CrudContext<MoveEngine.Data.AppDbContext> context) : base(context)
        {
            GeneratedForClassViewModel = context.ReflectionRepository.GetClassViewModel<MoveEngine.Data.Models.Role>();
        }

        [HttpGet("get/{id}")]
        [Authorize]
        public virtual Task<ItemResult<RoleResponse>> Get(
            string id,
            [FromQuery] DataSourceParameters parameters,
            IDataSource<MoveEngine.Data.Models.Role> dataSource)
            => GetImplementation(id, parameters, dataSource);

        [HttpGet("list")]
        [Authorize]
        public virtual Task<ListResult<RoleResponse>> List(
            [FromQuery] ListParameters parameters,
            IDataSource<MoveEngine.Data.Models.Role> dataSource)
            => ListImplementation(parameters, dataSource);

        [HttpGet("count")]
        [Authorize]
        public virtual Task<ItemResult<int>> Count(
            [FromQuery] FilterParameters parameters,
            IDataSource<MoveEngine.Data.Models.Role> dataSource)
            => CountImplementation(parameters, dataSource);

        [HttpPost("save")]
        [Consumes("application/x-www-form-urlencoded", "multipart/form-data")]
        [Authorize(Roles = "UserAdmin")]
        public virtual Task<ItemResult<RoleResponse>> Save(
            [FromForm] RoleParameter dto,
            [FromQuery] DataSourceParameters parameters,
            IDataSource<MoveEngine.Data.Models.Role> dataSource,
            IBehaviors<MoveEngine.Data.Models.Role> behaviors)
            => SaveImplementation(dto, parameters, dataSource, behaviors);

        [HttpPost("save")]
        [Consumes("application/json")]
        [Authorize(Roles = "UserAdmin")]
        public virtual Task<ItemResult<RoleResponse>> SaveFromJson(
            [FromBody] RoleParameter dto,
            [FromQuery] DataSourceParameters parameters,
            IDataSource<MoveEngine.Data.Models.Role> dataSource,
            IBehaviors<MoveEngine.Data.Models.Role> behaviors)
            => SaveImplementation(dto, parameters, dataSource, behaviors);

        [HttpPost("bulkSave")]
        [Authorize]
        public virtual Task<ItemResult<RoleResponse>> BulkSave(
            [FromBody] BulkSaveRequest dto,
            [FromQuery] DataSourceParameters parameters,
            IDataSource<MoveEngine.Data.Models.Role> dataSource,
            [FromServices] IDataSourceFactory dataSourceFactory,
            [FromServices] IBehaviorsFactory behaviorsFactory)
            => BulkSaveImplementation(dto, parameters, dataSource, dataSourceFactory, behaviorsFactory);

        [HttpPost("delete/{id}")]
        [Authorize(Roles = "UserAdmin")]
        public virtual Task<ItemResult<RoleResponse>> Delete(
            string id,
            IBehaviors<MoveEngine.Data.Models.Role> behaviors,
            IDataSource<MoveEngine.Data.Models.Role> dataSource)
            => DeleteImplementation(id, new DataSourceParameters(), dataSource, behaviors);
    }
}
