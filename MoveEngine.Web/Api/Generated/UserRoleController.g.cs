
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
    [Route("api/UserRole")]
    [Authorize]
    [ServiceFilter(typeof(IApiActionFilter))]
    public partial class UserRoleController
        : BaseApiController<MoveEngine.Data.Models.UserRole, UserRoleParameter, UserRoleResponse, MoveEngine.Data.AppDbContext>
    {
        public UserRoleController(CrudContext<MoveEngine.Data.AppDbContext> context) : base(context)
        {
            GeneratedForClassViewModel = context.ReflectionRepository.GetClassViewModel<MoveEngine.Data.Models.UserRole>();
        }

        [HttpGet("get/{id}")]
        [Authorize(Roles = "UserAdmin")]
        public virtual Task<ItemResult<UserRoleResponse>> Get(
            string id,
            [FromQuery] DataSourceParameters parameters,
            IDataSource<MoveEngine.Data.Models.UserRole> dataSource)
            => GetImplementation(id, parameters, dataSource);

        [HttpGet("list")]
        [Authorize(Roles = "UserAdmin")]
        public virtual Task<ListResult<UserRoleResponse>> List(
            [FromQuery] ListParameters parameters,
            IDataSource<MoveEngine.Data.Models.UserRole> dataSource)
            => ListImplementation(parameters, dataSource);

        [HttpGet("count")]
        [Authorize(Roles = "UserAdmin")]
        public virtual Task<ItemResult<int>> Count(
            [FromQuery] FilterParameters parameters,
            IDataSource<MoveEngine.Data.Models.UserRole> dataSource)
            => CountImplementation(parameters, dataSource);

        [HttpPost("save")]
        [Consumes("application/x-www-form-urlencoded", "multipart/form-data")]
        [Authorize]
        public virtual Task<ItemResult<UserRoleResponse>> Save(
            [FromForm] UserRoleParameter dto,
            [FromQuery] DataSourceParameters parameters,
            IDataSource<MoveEngine.Data.Models.UserRole> dataSource,
            IBehaviors<MoveEngine.Data.Models.UserRole> behaviors)
            => SaveImplementation(dto, parameters, dataSource, behaviors);

        [HttpPost("save")]
        [Consumes("application/json")]
        [Authorize]
        public virtual Task<ItemResult<UserRoleResponse>> SaveFromJson(
            [FromBody] UserRoleParameter dto,
            [FromQuery] DataSourceParameters parameters,
            IDataSource<MoveEngine.Data.Models.UserRole> dataSource,
            IBehaviors<MoveEngine.Data.Models.UserRole> behaviors)
            => SaveImplementation(dto, parameters, dataSource, behaviors);

        [HttpPost("bulkSave")]
        [Authorize(Roles = "UserAdmin")]
        public virtual Task<ItemResult<UserRoleResponse>> BulkSave(
            [FromBody] BulkSaveRequest dto,
            [FromQuery] DataSourceParameters parameters,
            IDataSource<MoveEngine.Data.Models.UserRole> dataSource,
            [FromServices] IDataSourceFactory dataSourceFactory,
            [FromServices] IBehaviorsFactory behaviorsFactory)
            => BulkSaveImplementation(dto, parameters, dataSource, dataSourceFactory, behaviorsFactory);

        [HttpPost("delete/{id}")]
        [Authorize(Roles = "UserAdmin")]
        public virtual Task<ItemResult<UserRoleResponse>> Delete(
            string id,
            IBehaviors<MoveEngine.Data.Models.UserRole> behaviors,
            IDataSource<MoveEngine.Data.Models.UserRole> dataSource)
            => DeleteImplementation(id, new DataSourceParameters(), dataSource, behaviors);
    }
}
