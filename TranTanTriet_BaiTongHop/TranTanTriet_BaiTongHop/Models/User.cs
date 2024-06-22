namespace TranTanTriet_BaiTongHop.Models
{
	public class User
	{
		public String Name { get; set; }
		public String numberPhone { get; set; }
		public DateTime Date { get; set; }
		public String Gender { get; set; }
		public String City { get; set; }
		public String Username { get; set; }
		public String Password { get; set; }
		public String rePassword { get; set; }
		public static List<User> users { get; set; }
	}
}
