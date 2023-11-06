using bda_p2_api.Models;
using System.ComponentModel.DataAnnotations;

namespace bda_p2_api.Services
{
    public interface IMongoDBService
    {

        /* **************************************************** Administradores **************************************************** */

        Task<List<Administrator>> GetAllAdministrators(); // NN

        Task<Administrator> GetAdministrator(string id); // 2.

        Task RegisterAdministrator(Administrator administrator); // 1.

        // UpdateAdministrator(string id, Administrator administrator) // NN

        Task DeleteAdministrator(string id); // NN

        /* ***************************************************** Colaboradores ***************************************************** */

        Task<List<Collaborator>> GetAllCollaborators(); // NN

        Task<Collaborator> GetCollaborator(string id); // 9.

        // Task<List<CollaboratorDepartment>>  GetCollaboratorsWithScheduledTrips(int month, int year) // 5. (new model)

        // Task<List<CollaboratorDestination>>  GetCollaboratorsWithInternationalTrips(int trimester, int year) // 6. (new model)

        Task RegisterCollaborator(Collaborator collaborator); // 8.

        // UpdateCollaborator(string id, Collaborator collaborator) // NN

        Task DeleteCollaborator(string id); // NN

        /* ****************************************************** Solicitudes ****************************************************** */

        Task<List<Request>> GetPendingRequests(); // 3.

        Task<List<Request>> GetCollaboratorsRequests(string id); // 11.

        // Task<List<CollaboratorTrip>>  GetRequestsToDestination(string destination) // 7. (new model)

        Task<Collaborator> MakeRequest(string id, Request request); // 10.

        // Task ValidateRequests(List<RequestValidation> validatedRequests) // 4. (new model)

        Task<Collaborator> UpdateRequest(string cid, string rid, Request request); // 12.

        Task<Collaborator> DeleteRequest(string cid, string rid); // 13.

    }
}
