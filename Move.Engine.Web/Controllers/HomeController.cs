using Move.Engine.Data.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using System.Web;

namespace Move.Engine.Web.Controllers;

public class HomeController() : Controller
{
    /// <summary>
    /// Spa route for vue-based parts of the app
    /// </summary>
    /// <remarks>
    /// Caching is prevented on this route because the served file contains
    /// the links to compiled js/css that include hashes in the filenames.
    /// </remarks>
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    [Authorize]
    public async Task<IActionResult> Index(
        [FromServices] IWebHostEnvironment hostingEnvironment
    )
    {

        var fileInfo = hostingEnvironment.WebRootFileProvider.GetFileInfo("index.html");
        if (!fileInfo.Exists) return NotFound($"{hostingEnvironment.WebRootPath}/index.html was not found");

        using var reader = new StreamReader(fileInfo.CreateReadStream());
        string contents = await reader.ReadToEndAsync();

        // OPTIONAL: Inject settings or other variables into index.html here.
        // These will then be available as global variables in your Vue app.
        // Declare them as globals in env.d.ts.
        string headPrepend = $"""
        <script>
            ASPNETCORE_ENVIRONMENT="{JsEncode(hostingEnvironment.EnvironmentName)}"
        </script>
        """;


        contents = contents.Replace("<head>", "<head>" + headPrepend);

        return Content(contents, "text/html");

        static string JsEncode(string s) => HttpUtility.JavaScriptStringEncode(s);
    }
}
