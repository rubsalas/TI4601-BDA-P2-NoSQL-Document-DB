using bda_p2_api.Models;

namespace bda_p2_api.Services
{
    public interface IMongoDBService
    {

        Task<List<Administrator>> GetAllAdministrators();

        Task<Administrator> GetAdministrator(string id);

        Task AddAdministrator(Administrator administrator);

        // AddAdministrators(List<Administrator> administrators);

        // UpdateAdministrator(string id, Administrator administrator)

        Task DeleteAdministrator(string id);

        /* ******************************************************************************************************************************** */

        Task<List<Collaborator>> GetAllCollaborators();

        Task<Collaborator> GetCollaborator(string id);

        Task AddCollaborator(Collaborator collaborator);

        // AddCollaborators(List<Collaborator> collaborator);

        // UpdateCollaborator(string id, Collaborator collaborator)

        Task DeleteCollaborator(string id);

        Task AddRequest(string id, Request request);

    }
}
