using bda_p2_api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<MongoDBService1>();
builder.Services.AddSingleton<MongoDBService2>();
builder.Services.AddSingleton<MongoDBService3>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IMongoDBService, MongoDBService1>();
builder.Services.AddScoped<IMongoDBService, MongoDBService2>();
builder.Services.AddScoped<IMongoDBService, MongoDBService3>();

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
