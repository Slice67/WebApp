using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Channels;
using WebApplication2.Models;

namespace WebApplication2.Controllers {
    [Route("api/[controller]")] //základní cesta pro všechny akce v tomto kontroleru, nahradí se názvem třídy, v tomto případě to bude api/users
    [ApiController] //označuje že slouží jako API
    public class UsersController : ControllerBase {

        private readonly UserDbContext _context;
        public UsersController(UserDbContext context) { // konstruktor, injektování dbcontextu
            _context = context;
        }

        [HttpPost] //tato metoda proběhne když přijde na HTTP POST požadavek na cestu api/users
        public async Task<ActionResult<User>> PostUser(User user) { //User - model binding
            _context.Users.Add(user);  // přidává nového uživatele do kontextu databáze
            await _context.SaveChangesAsync(); //uloží změny asynchronně
            return CreatedAtAction("GetUser", new { id = user.Id }, user); //vrátí odpověď HTTP 201 (Created) 
        }
        [HttpGet("{id}")] // tato metoda bude volána, když přijde HTTP GET požadavek na api/users/{id}
        public async Task<ActionResult<User>> GetUser(int id) {
            var user = await _context.Users.FindAsync(id); //najde uživatele s daným ID 
            if ( user == null ) {
                return NotFound(); // 404 not found
            }
            return user; // HTTP 200 OK
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetAllUsers() { //získání všech uživatelů z databáze
            return await _context.Users.ToListAsync();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] User updatedUser) {
            if ( id != updatedUser.Id ) {
                return BadRequest();
            }

            var existingUser = await _context.Users.FindAsync(id);
            if ( existingUser == null ) {
                return NotFound();
            }

            var changes = new List<ChangeLog>();

            void LogChange(string attribute, string oldValue, string newValue) {
                if ( oldValue != newValue ) {
                    changes.Add(new ChangeLog {
                        UserId = id,
                        Operation = "Updated",
                        ChangedAttribute = attribute,
                        OldValue = oldValue,
                        NewValue = newValue,
                        ChangeDate = DateTime.UtcNow
                    });
                }
            }

            LogChange("Name", existingUser.Name, updatedUser.Name);
            LogChange("Surname", existingUser.Surname, updatedUser.Surname);
            LogChange("Email", existingUser.Email, updatedUser.Email);
            LogChange("Telephone", existingUser.Telephone, updatedUser.Telephone);
            LogChange("Active", existingUser.Active.ToString(), updatedUser.Active.ToString());

            _context.Entry(existingUser).CurrentValues.SetValues(updatedUser);
            _context.Entry(existingUser).State = EntityState.Modified;
            _context.ChangeLogs.AddRange(changes);

            Console.WriteLine("Logované změny: ");
            foreach ( var change in changes ) {
                Console.WriteLine(
                    $"Attribute:{change.ChangedAttribute}, " +
                    $"OldValue: {change.OldValue}, " +
                    $"NewValue: {change.NewValue}");
            }

            try {
                await _context.SaveChangesAsync();
            } catch ( DbUpdateConcurrencyException ) {
                if ( !_context.Users.Any(e => e.Id == id) ) {
                    return NotFound();
                } else {
                    throw;
                }
            }
            return NoContent();
        }
        /*
        [HttpPost("test-log")]
        public async Task<IActionResult> TestChangeLog() {
            var testChange = new ChangeLog {
                UserId = 0, // Můžete použít jakékoliv ID, které má smysl pro testování
                Operation = "Test",
                ChangedAttribute = "TestAttribute",
                OldValue = "OldTestValue",
                NewValue = "NewTestValue",
                ChangeDate = DateTime.UtcNow
            };

            _context.ChangeLogs.Add(testChange);
            await _context.SaveChangesAsync();

            return Ok("ChangeLog záznam byl úspěšně přidán.");
        }
        */
    }
}
