using bda_p2_api.Models;
using MongoDB.Driver;

namespace bda_p2_api.Services.CollaboratorService
{
    public class CollaboratorService : ICollaboratorService
    {
        private readonly IMongoCollection<Collaborator> _collaboratorsCollection;

        public CollaboratorService(IMongoDatabase database)
        {
            _collaboratorsCollection = database.GetCollection<Collaborator>("Colaboradores");
        }


        // Funciones


    }
}
