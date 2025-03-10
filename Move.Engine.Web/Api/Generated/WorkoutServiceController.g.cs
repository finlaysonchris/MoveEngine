
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
    [Route("api/WorkoutService")]
    [ServiceFilter(typeof(IApiActionFilter))]
    public partial class WorkoutServiceController : BaseApiController
    {
        protected Move.Engine.Data.Services.WorkoutService Service { get; }

        public WorkoutServiceController(CrudContext context, Move.Engine.Data.Services.WorkoutService service) : base(context)
        {
            GeneratedForClassViewModel = context.ReflectionRepository.GetClassViewModel<Move.Engine.Data.Services.WorkoutService>();
            Service = service;
        }

        /// <summary>
        /// Method: GenerateWorkout
        /// </summary>
        [HttpPost("GenerateWorkout")]
        [Authorize]
        [Consumes("application/x-www-form-urlencoded", "multipart/form-data")]
        public virtual ItemResult<string> GenerateWorkout(
            [FromForm(Name = "workingRequest")] string workingRequest)
        {
            var _params = new
            {
                WorkingRequest = workingRequest
            };

            if (Context.Options.ValidateAttributesForMethods)
            {
                var _validationResult = ItemResult.FromParameterValidation(
                    GeneratedForClassViewModel!.MethodByName("GenerateWorkout"), _params, HttpContext.RequestServices);
                if (!_validationResult.WasSuccessful) return new ItemResult<string>(_validationResult);
            }

            var _methodResult = Service.GenerateWorkout(
                _params.WorkingRequest
            );
            var _result = new ItemResult<string>();
            _result.Object = _methodResult;
            return _result;
        }

        public class GenerateWorkoutParameters
        {
            public string WorkingRequest { get; set; }
        }

        /// <summary>
        /// Method: GenerateWorkout
        /// </summary>
        [HttpPost("GenerateWorkout")]
        [Authorize]
        [Consumes("application/json")]
        public virtual ItemResult<string> GenerateWorkout(
            [FromBody] GenerateWorkoutParameters _params
        )
        {
            if (Context.Options.ValidateAttributesForMethods)
            {
                var _validationResult = ItemResult.FromParameterValidation(
                    GeneratedForClassViewModel!.MethodByName("GenerateWorkout"), _params, HttpContext.RequestServices);
                if (!_validationResult.WasSuccessful) return new ItemResult<string>(_validationResult);
            }

            var _methodResult = Service.GenerateWorkout(
                _params.WorkingRequest
            );
            var _result = new ItemResult<string>();
            _result.Object = _methodResult;
            return _result;
        }
    }
}
