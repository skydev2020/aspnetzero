using Abp.AspNetCore.Mvc.Authorization;
using ThemeTestingProjectDemo.Storage;

namespace ThemeTestingProjectDemo.Web.Controllers
{
    [AbpMvcAuthorize]
    public class ProfileController : ProfileControllerBase
    {
        public ProfileController(ITempFileCacheManager tempFileCacheManager) :
            base(tempFileCacheManager)
        {
        }
    }
}