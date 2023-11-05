using bda_p2_api.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;

namespace bda_p2_api.Services
{
    public class MongoDBService1 : IMongoDBService
    {
        private readonly IMongoCollection<Administrator> _administratorsCollection;
        private readonly IMongoCollection<Collaborator> _collaboratorsCollection;

        public MongoDBService1(IOptions<MongoDBSettings> mongoDBSettings)
        {
            //MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionURI); 
            MongoClient client = new MongoClient("mongodb+srv://cbdap2-1:cbdap2-1@clusterbdap2-1.qxq3tsq.mongodb.net/?retryWrites=true&w=majority");
            IMongoDatabase database = client.GetDatabase("bdap2-1"); // mongoDBSettings.Value.DatabaseName);
            _administratorsCollection = database.GetCollection<Administrator>("Administradores"); // mongoDBSettings.Value.AdminCollectionName);
            _collaboratorsCollection = database.GetCollection<Collaborator>("Colaboradores");
        }

        public async Task<List<Administrator>> GetAllAdministrators()
        {
            return await _administratorsCollection.Find(new BsonDocument()).ToListAsync();
        }

        public async Task<Administrator> GetAdministrator(string id)
        {
            FilterDefinition<Administrator> filter = Builders<Administrator>.Filter.Eq("id", id);
            var administrator = await _administratorsCollection.Find(filter).FirstOrDefaultAsync();
            return administrator;
        }

        public async Task AddAdministrator(Administrator administrator)
        {
            await _administratorsCollection.InsertOneAsync(administrator);
            return;
        }

        public async Task DeleteAdministrator(string id)
        {
            FilterDefinition<Administrator> filter = Builders<Administrator>.Filter.Eq("id", id);
            await _administratorsCollection.DeleteOneAsync(filter);
            return;
        }


        /* ******************************************************************************************************************************** */



        public async Task<List<Collaborator>> GetAllCollaborators()
        {
            return await _collaboratorsCollection.Find(new BsonDocument()).ToListAsync();
        }

        public async Task<Collaborator> GetCollaborator(string id)
        {
            FilterDefinition<Collaborator> filter = Builders<Collaborator>.Filter.Eq("id", id);
            var collaborator = await _collaboratorsCollection.Find(filter).FirstOrDefaultAsync();
            return collaborator;
        }

        public async Task AddCollaborator(Collaborator collaborator)
        {
            await _collaboratorsCollection.InsertOneAsync(collaborator);
            return;
        }

        public async Task DeleteCollaborator(string id)
        {
            FilterDefinition<Collaborator> filter = Builders<Collaborator>.Filter.Eq("id", id);
            await _collaboratorsCollection.DeleteOneAsync(filter);
            return;
        }


        public async Task AddRequest(string id, Request request)
        {
            FilterDefinition<Collaborator> filter = Builders<Collaborator>.Filter.Eq("id", id);
            UpdateDefinition<Collaborator> update = Builders<Collaborator>.Update.AddToSet("solicitudes", request);
            await _collaboratorsCollection.UpdateOneAsync(filter, update);
            return;
        }

    }
}
