using Abp.AspNetCore.Mvc.Authorization;
using ThemeTestingProjectDemo.Authorization;
using ThemeTestingProjectDemo.Storage;
using Abp.BackgroundJobs;

namespace ThemeTestingProjectDemo.Web.Controllers
{
    [AbpMvcAuthorize(AppPermissions.Pages_Administration_Users)]
    public class UsersController : UsersControllerBase
    {
        public UsersController(IBinaryObjectManager binaryObjectManager, IBackgroundJobManager backgroundJobManager)
            : base(binaryObjectManager, backgroundJobManager)
        {
        }
    }
}