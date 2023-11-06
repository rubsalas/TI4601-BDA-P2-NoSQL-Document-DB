using bda_p2_api.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;


namespace bda_p2_api.Services
{
    public class MongoDBService2 : IMongoDBService
    {
        private readonly IMongoCollection<Administrator> _administratorsCollection;
        private readonly IMongoCollection<Collaborator> _collaboratorsCollection;

        public MongoDBService2(IOptions<MongoDBSettings> mongoDBSettings)
        {
            MongoClient client = new MongoClient("mongodb+srv://cbdap2-2:cbdap2-2@clusterbdap2-2.lsmrdqo.mongodb.net/?retryWrites=true&w=majority");
            IMongoDatabase database = client.GetDatabase("bdap2-2");
            _administratorsCollection = database.GetCollection<Administrator>("Administradores");
            _collaboratorsCollection = database.GetCollection<Collaborator>("Colaboradores");
        }

        /* **************************************************** Administradores **************************************************** */


        public async Task<List<Administrator>> GetAllAdministrators()
        {
            return await _administratorsCollection.Find(new BsonDocument()).ToListAsync();
        }

        // 2.
        /// <summary>
        /// Obtiene un Administrador con id específico.
        /// </summary>
        /// <param name="id">Id del Administrador por buscar.</param>
        /// <returns>Modelo del Administrador que se encuentra.</returns>
        public async Task<Administrator> GetAdministrator(string id)
        {
            FilterDefinition<Administrator> filter = Builders<Administrator>.Filter.Eq("id", id);
            var administrator = await _administratorsCollection.Find(filter).FirstOrDefaultAsync();
            return administrator;
        }

        // 1.
        /// <summary>
        /// Registra un Administrador.
        /// </summary>
        /// <param name="id">Modelo del Administrador por registrar.</param>
        /// <returns></returns>
        public async Task RegisterAdministrator(Administrator administrator)
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


        /* ***************************************************** Colaboradores ***************************************************** */



        public async Task<List<Collaborator>> GetAllCollaborators()
        {
            return await _collaboratorsCollection.Find(new BsonDocument()).ToListAsync();
        }

        // 9.
        /// <summary>
        /// Obtiene un Colaborador con id específico.
        /// </summary>
        /// <param name="id">Id del Colaborador por buscar.</param>
        /// <returns>Modelo del Colaborador que se encuentra.</returns>
        public async Task<Collaborator> GetCollaborator(string id)
        {
            FilterDefinition<Collaborator> filter = Builders<Collaborator>.Filter.Eq("id", id);
            var collaborator = await _collaboratorsCollection.Find(filter).FirstOrDefaultAsync();
            return collaborator;
        }

        // 8.
        /// <summary>
        /// Registra un Colaborador.
        /// </summary>
        /// <param name="id">Modelo del Colaborador por registrar.</param>
        /// <returns></returns>
        public async Task RegisterCollaborator(Collaborator collaborator)
        {
            await _collaboratorsCollection.InsertOneAsync(collaborator);
            // Hacer un query para buscar el colaborador, obtener el id y retornar la funcion GET
            return;
        }

        public async Task DeleteCollaborator(string id)
        {
            FilterDefinition<Collaborator> filter = Builders<Collaborator>.Filter.Eq("id", id);
            await _collaboratorsCollection.DeleteOneAsync(filter);
            return;
        }


        /* ****************************************************** Solicitudes ****************************************************** */


        // 3.
        /// <summary>
        /// Obtiene todas las solicitudes que tienen "Pendiente" como estado.
        /// </summary>
        /// <returns>Lista de Solicitudes.</returns>
        public async Task<List<Request>> GetPendingRequests()
        {
            FilterDefinition<Collaborator> filter = Builders<Collaborator>.Filter.ElemMatch(
                x => x.solicitudes,
                Builders<Request>.Filter.Eq(s => s.estado, "Pendiente"));

            ProjectionDefinition<Collaborator> projection = Builders<Collaborator>.Projection.Include(x => x.solicitudes);

            var colaboradoresConSolicitudesPendientes = await _collaboratorsCollection
                .Find(filter)
                .Project<Collaborator>(projection)
                .ToListAsync();

            var pendingRequests = colaboradoresConSolicitudesPendientes
                .SelectMany(colaborador => colaborador.solicitudes)
                .Where(solicitud => solicitud.estado == "Pendiente")
                .ToList();

            return pendingRequests;
        }

        // 11.
        /// <summary>
        /// Obtiene todas las solicitudes de un Colaborador con id especifico
        /// </summary>
        /// <param name="id">Id del Colaborador.</param>
        /// <returns>Lista de Solicitudes de viaje del Colaborador.</returns>
        public async Task<List<Request>> GetCollaboratorsRequests(string id)
        {
            FilterDefinition<Collaborator> filter = Builders<Collaborator>.Filter.Eq("id", id);
            var colaborador = await _collaboratorsCollection.Find(filter).FirstOrDefaultAsync();

            if (colaborador is null)
            {
                return null; // Colaborador no encontrado
            }
            return colaborador.solicitudes;
        }

        // 10.
        /// <summary>
        /// Agrega una solicitud a un Colaborador con id especifico.
        /// </summary>
        /// <param name="id">Id del Colaborador.</param>
        /// <param name="request">Solicitud de viaje del Colaborador.</param>
        /// <returns> El modelo del Colaborador que hizo la Solicitud.</returns>
        public async Task<Collaborator> MakeRequest(string id, Request request)
        {
            FilterDefinition<Collaborator> filter = Builders<Collaborator>.Filter.Eq("id", id);
            UpdateDefinition<Collaborator> update = Builders<Collaborator>.Update.AddToSet("solicitudes", request);
            await _collaboratorsCollection.UpdateOneAsync(filter, update);
            return await GetCollaborator(id);
        }

        //12.
        /// <summary>
        /// Actualiza una solicitud de un Colaborador con id especifico.
        /// </summary>
        /// <param name="cid">Id del Colaborador.</param>
        /// <param name="rid">Id de la Solicitud.</param>
        /// <param name="request">Solicitud de viaje del Colaborador.</param>
        /// <returns> El modelo del Colaborador que hizo la Solicitud.</returns>
        public async Task<Collaborator> UpdateRequest(string cid, string rid, Request request)
        {
            request.id = rid;

            var filter = Builders<Collaborator>.Filter.And(
                Builders<Collaborator>.Filter.Eq("id", cid),
                Builders<Collaborator>.Filter.ElemMatch(x => x.solicitudes, s => s.id == rid));

            var arrayFilter = Builders<Collaborator>.Update
                .Set($"solicitudes.$[elem]", request);

            var arrayFilters = new List<ArrayFilterDefinition>
            {
                new BsonDocumentArrayFilterDefinition<Collaborator>(new BsonDocument("elem._id", rid))
            };

            var options = new UpdateOptions
            {
                ArrayFilters = arrayFilters
            };

            var result = await _collaboratorsCollection.UpdateOneAsync(filter, arrayFilter, options);

            if (result.IsAcknowledged && result.ModifiedCount > 0)
                return await GetCollaborator(cid);

            return null;
        }

        // 13.
        /// <summary>
        /// Elimina una solicitud de un Colaborador con id especifico.
        /// </summary>
        /// <param name="cid">Id del Colaborador.</param>
        /// <param name="rid">Id de la Solicitud.</param>
        /// <returns> El modelo del Colaborador que hizo la Solicitud.</returns>
        public async Task<Collaborator> DeleteRequest(string cid, string rid)
        {
            var filter = Builders<Collaborator>.Filter.Eq("id", cid);
            var update = Builders<Collaborator>.Update.PullFilter(x => x.solicitudes, s => s.id == rid);

            var result = await _collaboratorsCollection.UpdateOneAsync(filter, update);

            if (result.IsAcknowledged && result.ModifiedCount > 0)
                return await GetCollaborator(cid);

            return null;
        }

    }
}
