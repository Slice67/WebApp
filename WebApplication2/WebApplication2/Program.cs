using Microsoft.EntityFrameworkCore;
using WebApplication2.Models;

var builder = WebApplication.CreateBuilder(args); //builder umo��uje konfigurovat aplikaci, slu�by, middleware...

builder.Services.AddDbContext<UserDbContext>(options => // dependency injection
    options.UseSqlite("Data Source=users.db")); //konfiguruje EF aby pou��val SQLite datab�zi
builder.Services.AddControllers(); //registruje podporu pro kontrol�ry

builder.Services.AddCors(options => { //��d� jak� dom�ny mohou p�istupovat k API
    options.AddPolicy("AllowAll", builder => {
        builder.AllowAnyOrigin() //p��stup ze v�ech dom�n
               .AllowAnyMethod() //v�echny HTTP metody
               .AllowAnyHeader(); //v�echny typy hlavi�ek
    });
});

var app = builder.Build(); //z objektu builder vytvo�� pln� konfigurovanou aplikaci

app.MapControllers(); //middleware a mapov�n� na odpov�daj�c� cesty
app.UseCors("AllowAll"); //CORS politika
app.UseRouting(); //nastavuje middleware sm�rov�n�
app.Run(); // spu�t�n� aplikace
