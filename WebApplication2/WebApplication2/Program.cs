using Microsoft.EntityFrameworkCore;
using WebApplication2.Models;

var builder = WebApplication.CreateBuilder(args); //builder umožòuje konfigurovat aplikaci, služby, middleware...

builder.Services.AddDbContext<UserDbContext>(options => // dependency injection
    options.UseSqlite("Data Source=users.db")); //konfiguruje EF aby používal SQLite databázi
builder.Services.AddControllers(); //registruje podporu pro kontroléry

builder.Services.AddCors(options => { //øídí jaké domény mohou pøistupovat k API
    options.AddPolicy("AllowAll", builder => {
        builder.AllowAnyOrigin() //pøístup ze všech domén
               .AllowAnyMethod() //všechny HTTP metody
               .AllowAnyHeader(); //všechny typy hlavièek
    });
});

var app = builder.Build(); //z objektu builder vytvoøí plnì konfigurovanou aplikaci

app.MapControllers(); //middleware a mapování na odpovídající cesty
app.UseCors("AllowAll"); //CORS politika
app.UseRouting(); //nastavuje middleware smìrování
app.Run(); // spuštìní aplikace
