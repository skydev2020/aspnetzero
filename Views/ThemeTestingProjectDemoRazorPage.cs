using Abp.AspNetCore.Mvc.Views;

namespace ThemeTestingProjectDemo.Web.Views
{
    public abstract class ThemeTestingProjectDemoRazorPage<TModel> : AbpRazorPage<TModel>
    {
        protected ThemeTestingProjectDemoRazorPage()
        {
            LocalizationSourceName = ThemeTestingProjectDemoConsts.LocalizationSourceName;
        }
    }
}
