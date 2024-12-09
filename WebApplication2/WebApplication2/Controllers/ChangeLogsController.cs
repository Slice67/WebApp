using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication2.Models;

namespace WebApplication2.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class ChangeLogsController : ControllerBase {
        private readonly UserDbContext _context;

        public ChangeLogsController(UserDbContext context) {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ChangeLog>>> GetAllChangeLogs() {
            return await _context.ChangeLogs.ToListAsync();
        }
    }
}
