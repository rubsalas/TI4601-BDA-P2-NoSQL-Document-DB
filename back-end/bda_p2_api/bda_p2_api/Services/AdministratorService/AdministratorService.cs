using bda_p2_api.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;

namespace bda_p2_api.Services.AdministratorService
{
    public class AdministratorService : IAdministratorService
    {

        private readonly IMongoCollection<Administrator> _administratorsCollection;

        public AdministratorService(IMongoDatabase database)
        {
            _administratorsCollection = database.GetCollection<Administrator>("Administradores");
        }


        // Funciones

        //Example
        public async Task CreateAsync(Administrator administrator)
        {
            await _administratorsCollection.InsertOneAsync(administrator);
            return;
        }

        public async Task<List<Administrator>> GetAdministrators()
        {
            return await _administratorsCollection.Find(new BsonDocument()).ToListAsync();
        }

    }

}
