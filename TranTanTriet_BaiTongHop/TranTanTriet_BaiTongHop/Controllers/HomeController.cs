using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Reflection;
using System.Text.Json;
using System.Xml.Linq;
using TranTanTriet_BaiTongHop.Models;

namespace TranTanTriet_BaiTongHop.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }


        public IActionResult Index()
        {
            return View();
        }

        private static List<User> users = new List<User>();

        [HttpPost]
		public IActionResult Create([FromBody]User user)
		{
            if(user == null)
            {
                return BadRequest(new { success = false, message = "User data is null" });
            }
            if(string.IsNullOrWhiteSpace(user.Name) ||
				string.IsNullOrWhiteSpace(user.numberPhone) ||
				user.Date == default(DateTime) ||
				string.IsNullOrWhiteSpace(user.Gender) ||
				string.IsNullOrWhiteSpace(user.City) ||
				string.IsNullOrWhiteSpace(user.Username) ||
				string.IsNullOrWhiteSpace(user.Password) ||
                string.IsNullOrWhiteSpace(user.rePassword))
            {
                return BadRequest(new { success = false, message = "One or more fields are empty or invalid" });
            }
            users.Add(user);
            return Ok(new {success = true, message = "User created successfully"});
		}

        [HttpGet]
		public IActionResult List()
        {
            return View(users);
		}

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
