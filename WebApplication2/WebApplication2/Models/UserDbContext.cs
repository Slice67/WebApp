using Microsoft.EntityFrameworkCore;

namespace WebApplication2.Models {
    public class UserDbContext:DbContext {
        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options) { 
        
        }

        public DbSet<User> Users { get; set; }
        public DbSet<ChangeLog> ChangeLogs {  get; set; }
    }
}
