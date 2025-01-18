
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
    [Route("api/Widget")]
    [Authorize]
    [ServiceFilter(typeof(IApiActionFilter))]
    public partial class WidgetController
        : BaseApiController<MoveEngine.Data.Models.Widget, WidgetParameter, WidgetResponse, MoveEngine.Data.AppDbContext>
    {
        public WidgetController(CrudContext<MoveEngine.Data.AppDbContext> context) : base(context)
        {
            GeneratedForClassViewModel = context.ReflectionRepository.GetClassViewModel<MoveEngine.Data.Models.Widget>();
        }

        [HttpGet("get/{id}")]
        [Authorize]
        public virtual Task<ItemResult<WidgetResponse>> Get(
            int id,
            [FromQuery] DataSourceParameters parameters,
            IDataSource<MoveEngine.Data.Models.Widget> dataSource)
            => GetImplementation(id, parameters, dataSource);

        [HttpGet("list")]
        [Authorize]
        public virtual Task<ListResult<WidgetResponse>> List(
            [FromQuery] ListParameters parameters,
            IDataSource<MoveEngine.Data.Models.Widget> dataSource)
            => ListImplementation(parameters, dataSource);

        [HttpGet("count")]
        [Authorize]
        public virtual Task<ItemResult<int>> Count(
            [FromQuery] FilterParameters parameters,
            IDataSource<MoveEngine.Data.Models.Widget> dataSource)
            => CountImplementation(parameters, dataSource);

        [HttpPost("save")]
        [Consumes("application/x-www-form-urlencoded", "multipart/form-data")]
        [Authorize]
        public virtual Task<ItemResult<WidgetResponse>> Save(
            [FromForm] WidgetParameter dto,
            [FromQuery] DataSourceParameters parameters,
            IDataSource<MoveEngine.Data.Models.Widget> dataSource,
            IBehaviors<MoveEngine.Data.Models.Widget> behaviors)
            => SaveImplementation(dto, parameters, dataSource, behaviors);

        [HttpPost("save")]
        [Consumes("application/json")]
        [Authorize]
        public virtual Task<ItemResult<WidgetResponse>> SaveFromJson(
            [FromBody] WidgetParameter dto,
            [FromQuery] DataSourceParameters parameters,
            IDataSource<MoveEngine.Data.Models.Widget> dataSource,
            IBehaviors<MoveEngine.Data.Models.Widget> behaviors)
            => SaveImplementation(dto, parameters, dataSource, behaviors);

        [HttpPost("bulkSave")]
        [Authorize]
        public virtual Task<ItemResult<WidgetResponse>> BulkSave(
            [FromBody] BulkSaveRequest dto,
            [FromQuery] DataSourceParameters parameters,
            IDataSource<MoveEngine.Data.Models.Widget> dataSource,
            [FromServices] IDataSourceFactory dataSourceFactory,
            [FromServices] IBehaviorsFactory behaviorsFactory)
            => BulkSaveImplementation(dto, parameters, dataSource, dataSourceFactory, behaviorsFactory);

        [HttpPost("delete/{id}")]
        [Authorize]
        public virtual Task<ItemResult<WidgetResponse>> Delete(
            int id,
            IBehaviors<MoveEngine.Data.Models.Widget> behaviors,
            IDataSource<MoveEngine.Data.Models.Widget> dataSource)
            => DeleteImplementation(id, new DataSourceParameters(), dataSource, behaviors);
    }
}
