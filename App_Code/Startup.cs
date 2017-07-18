using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(findeat.Startup))]
namespace findeat
{
    public partial class Startup {
        public void Configuration(IAppBuilder app) {
            ConfigureAuth(app);
        }
    }
}
