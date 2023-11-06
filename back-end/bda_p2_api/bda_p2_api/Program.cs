using bda_p2_api.Models;
using bda_p2_api.Services;
using MongoDB.Driver;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<MongoDBService1>(builder.Configuration.GetSection("MongoDB1"));
builder.Services.AddSingleton<MongoDBService1>();

builder.Services.Configure<MongoDBService2>(builder.Configuration.GetSection("MongoDB2"));
builder.Services.AddSingleton<MongoDBService2>();

builder.Services.Configure<MongoDBService3>(builder.Configuration.GetSection("MongoDB3"));
builder.Services.AddSingleton<MongoDBService3>();

builder.Services.AddControllers();
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
