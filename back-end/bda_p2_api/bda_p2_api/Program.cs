using bda_p2_api.Models;
using bda_p2_api.Services;
using MongoDB.Driver;
using Microsoft.Extensions.Configuration;
using bda_p2_api.Services.AdministratorService;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.Configure<MongoDBService1>(builder.Configuration.GetSection("MongoDB1"));
builder.Services.AddSingleton<MongoDBService1>();

//var mongoDBSettings1 = builder.Configuration.GetSection("MongoDB1");
//MongoClient client = new MongoClient(mongoDBSettings1["ConnectionURI"]);
//var database = client.GetDatabase(mongoDBSettings1["DatabaseName"]);

//builder.Services.Configure<AdministratorService>((IOptions)database);
//builder.Services.AddSingleton<AdministratorService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
