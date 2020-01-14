using Microsoft.AspNetCore.Antiforgery;

namespace ThemeTestingProjectDemo.Web.Controllers
{
    public class AntiForgeryController : ThemeTestingProjectDemoControllerBase
    {
        private readonly IAntiforgery _antiforgery;

        public AntiForgeryController(IAntiforgery antiforgery)
        {
            _antiforgery = antiforgery;
        }

        public void GetToken()
        {
            _antiforgery.SetCookieTokenAndHeader(HttpContext);
        }
    }
}
