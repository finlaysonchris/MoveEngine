
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
    [Route("api/UserWorkout")]
    [Authorize]
    [ServiceFilter(typeof(IApiActionFilter))]
    public partial class UserWorkoutController
        : BaseApiController<Move.Engine.Data.Models.UserWorkout, UserWorkoutParameter, UserWorkoutResponse, Move.Engine.Data.AppDbContext>
    {
        public UserWorkoutController(CrudContext<Move.Engine.Data.AppDbContext> context) : base(context)
        {
            GeneratedForClassViewModel = context.ReflectionRepository.GetClassViewModel<Move.Engine.Data.Models.UserWorkout>();
        }

        [HttpGet("get/{id}")]
        [Authorize]
        public virtual Task<ItemResult<UserWorkoutResponse>> Get(
            int id,
            [FromQuery] DataSourceParameters parameters,
            IDataSource<Move.Engine.Data.Models.UserWorkout> dataSource)
            => GetImplementation(id, parameters, dataSource);

        [HttpGet("list")]
        [Authorize]
        public virtual Task<ListResult<UserWorkoutResponse>> List(
            [FromQuery] ListParameters parameters,
            IDataSource<Move.Engine.Data.Models.UserWorkout> dataSource)
            => ListImplementation(parameters, dataSource);

        [HttpGet("count")]
        [Authorize]
        public virtual Task<ItemResult<int>> Count(
            [FromQuery] FilterParameters parameters,
            IDataSource<Move.Engine.Data.Models.UserWorkout> dataSource)
            => CountImplementation(parameters, dataSource);

        [HttpPost("save")]
        [Consumes("application/x-www-form-urlencoded", "multipart/form-data")]
        [Authorize]
        public virtual Task<ItemResult<UserWorkoutResponse>> Save(
            [FromForm] UserWorkoutParameter dto,
            [FromQuery] DataSourceParameters parameters,
            IDataSource<Move.Engine.Data.Models.UserWorkout> dataSource,
            IBehaviors<Move.Engine.Data.Models.UserWorkout> behaviors)
            => SaveImplementation(dto, parameters, dataSource, behaviors);

        [HttpPost("save")]
        [Consumes("application/json")]
        [Authorize]
        public virtual Task<ItemResult<UserWorkoutResponse>> SaveFromJson(
            [FromBody] UserWorkoutParameter dto,
            [FromQuery] DataSourceParameters parameters,
            IDataSource<Move.Engine.Data.Models.UserWorkout> dataSource,
            IBehaviors<Move.Engine.Data.Models.UserWorkout> behaviors)
            => SaveImplementation(dto, parameters, dataSource, behaviors);

        [HttpPost("bulkSave")]
        [Authorize]
        public virtual Task<ItemResult<UserWorkoutResponse>> BulkSave(
            [FromBody] BulkSaveRequest dto,
            [FromQuery] DataSourceParameters parameters,
            IDataSource<Move.Engine.Data.Models.UserWorkout> dataSource,
            [FromServices] IDataSourceFactory dataSourceFactory,
            [FromServices] IBehaviorsFactory behaviorsFactory)
            => BulkSaveImplementation(dto, parameters, dataSource, dataSourceFactory, behaviorsFactory);

        [HttpPost("delete/{id}")]
        [Authorize]
        public virtual Task<ItemResult<UserWorkoutResponse>> Delete(
            int id,
            IBehaviors<Move.Engine.Data.Models.UserWorkout> behaviors,
            IDataSource<Move.Engine.Data.Models.UserWorkout> dataSource)
            => DeleteImplementation(id, new DataSourceParameters(), dataSource, behaviors);

        // Methods from data class exposed through API Controller.

        /// <summary>
        /// Method: SaveWorkout
        /// </summary>
        [HttpPost("SaveWorkout")]
        [Authorize]
        [Consumes("application/x-www-form-urlencoded", "multipart/form-data")]
        public virtual ItemResult SaveWorkout(
            [FromServices] Move.Engine.Data.AppDbContext context,
            [FromForm(Name = "name")] string name,
            [FromForm(Name = "workout")] string workout)
        {
            var _params = new
            {
                Name = name,
                Workout = workout
            };

            if (Context.Options.ValidateAttributesForMethods)
            {
                var _validationResult = ItemResult.FromParameterValidation(
                    GeneratedForClassViewModel!.MethodByName("SaveWorkout"), _params, HttpContext.RequestServices);
                if (!_validationResult.WasSuccessful) return _validationResult;
            }

            Move.Engine.Data.Models.UserWorkout.SaveWorkout(
                context,
                User,
                _params.Name,
                _params.Workout
            );
            var _result = new ItemResult();
            return _result;
        }

        public class SaveWorkoutParameters
        {
            public string Name { get; set; }
            public string Workout { get; set; }
        }

        /// <summary>
        /// Method: SaveWorkout
        /// </summary>
        [HttpPost("SaveWorkout")]
        [Authorize]
        [Consumes("application/json")]
        public virtual ItemResult SaveWorkout(
            [FromServices] Move.Engine.Data.AppDbContext context,
            [FromBody] SaveWorkoutParameters _params
        )
        {
            if (Context.Options.ValidateAttributesForMethods)
            {
                var _validationResult = ItemResult.FromParameterValidation(
                    GeneratedForClassViewModel!.MethodByName("SaveWorkout"), _params, HttpContext.RequestServices);
                if (!_validationResult.WasSuccessful) return _validationResult;
            }

            Move.Engine.Data.Models.UserWorkout.SaveWorkout(
                context,
                User,
                _params.Name,
                _params.Workout
            );
            var _result = new ItemResult();
            return _result;
        }
    }
}
