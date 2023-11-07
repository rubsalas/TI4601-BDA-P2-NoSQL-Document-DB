using bda_p2_api.Models;
using bda_p2_api.Services;
using Microsoft.AspNetCore.Mvc;

namespace bda_p2_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CollaboratorController : Controller
    {
        private readonly MongoDBService1 _collaboratorService1;
        private readonly MongoDBService2 _collaboratorService2;
        private readonly MongoDBService3 _collaboratorService3;

        // Constructor
        public CollaboratorController(MongoDBService1 collaboratorService1, MongoDBService2 collaboratorService2, MongoDBService3 collaboratorService3)
        {
            _collaboratorService1 = collaboratorService1;
            _collaboratorService2 = collaboratorService2;
            _collaboratorService3 = collaboratorService3;
        }

        /// <summary>
        /// Request que obtiene todos los Colaboradores.
        /// </summary>
        /// <returns>Lista de modelos de todos los Colaboradores.</returns>
        [HttpGet]
        public async Task<List<Collaborator>> GetAllCollaborators()
        {
            return await _collaboratorService1.GetAllCollaborators();
        }

        /// <summary>
        /// Request que obtiene un Colaborador de la base de datos.
        /// </summary>
        /// <param name="id">Id del Colaborador por buscar.</param>
        /// <returns>Modelo del Colaborador que se encuentra.</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Collaborator>> GetCollaborator(string id)
        {
            var result = await _collaboratorService1.GetCollaborator(id);
            if (result is null)
                return NotFound(string.Format("There is no collaborator with id = {0}.", id));
            return Ok(result);
        }

        /// <summary>
        /// Request para agregar un Colaborador en la base de datos.
        /// </summary>
        /// <param name="collaborator">Modelo del Colaborador por agregar.</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> RegisterCollaborator(Collaborator collaborator)
        {
            collaborator.solicitudes = new List<Request>();
            // BDAP2-1
            await _collaboratorService1.RegisterCollaborator(collaborator);
            // BDAP2-2
            await _collaboratorService2.RegisterCollaborator(collaborator);
            // BDAP2-3
            await _collaboratorService3.RegisterCollaborator(collaborator);
            return CreatedAtAction(nameof(GetAllCollaborators), new { id = collaborator.id }, collaborator);
        }

        /// <summary>
        /// Request que elimina un Colaborador de la base de datos.
        /// </summary>
        /// <param name="id">Id del Colaborador por eliminar.</param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCollaborator(string id)
        {   
            // BDAP2-1
            await _collaboratorService1.DeleteCollaborator(id);
            // BDAP2-2
            await _collaboratorService2.DeleteCollaborator(id);
            // BDAP2-3
            await _collaboratorService3.DeleteCollaborator(id);

            return NoContent();
        }


        /* ****************************************************** Solicitudes ****************************************************** */


        /// <summary>
        /// Request que obtiene las Solicitudes de un Colaborador especifico de la base de datos.
        /// </summary>
        /// <param name="id">Id del Colaborador que hace la solicitud.</param>
        /// <returns> Lista de las Solicitudes del Colaborador.</returns>
        [HttpGet("{id}/Request")]
        public async Task<ActionResult<List<Request>>> GetCollaboratorsRequests(string id)
        {
            // BDAP2-1
            var result = await _collaboratorService1.GetCollaboratorsRequests(id);
            // BDAP2-2
            var result2 = await _collaboratorService2.GetCollaboratorsRequests(id);
            // BDAP2-3
            var result3 = await _collaboratorService3.GetCollaboratorsRequests(id);

            if (result is null)
                return NotFound(string.Format("There are no requests asigned to Collaborator with id = {0}.", id));
            return Ok(result);
        }

        /// <summary>
        /// Request que crea una Solicitud a un Colaborador en la base de datos.
        /// </summary>
        /// <param name="id">Id del Colaborador que hace la solicitud.</param>
        /// <param name="request"> Solicitud de viaje.</param>
        /// <returns> El modelo del Colaborador que hizo la Solicitud.</returns>
        [HttpPost("{id}/Request")]
        public async Task<ActionResult<Collaborator>> MakeRequest(string id, Request request)
        {
            string uniqueId = $"{DateTime.Now:yyyyMMddHHmmssfff}-{Guid.NewGuid()}";
            request.id = uniqueId.Replace("-", ""); ;

            // BDAP2-1
            var result = await _collaboratorService1.MakeRequest(id, request);
            // BDAP2-2
            var result2 = await _collaboratorService2.MakeRequest(id, request);
            // BDAP2-3
            var result3 = await _collaboratorService3.MakeRequest(id, request);

            if (result is null)
                return NotFound(string.Format("There is no Collaborator with id = {0}.", id));
            return Ok(result);
        }

        /// <summary>
        /// Request que actualiza una Solicitud de un Colaborador en la base de datos.
        /// </summary>
        /// <param name="id">Id del Colaborador.</param>
        /// <param name="rid">Id de la Solicitud.</param>
        /// <param name="request">Solicitud de viaje del Colaborador.</param>
        /// <returns> El modelo del Colaborador que hizo la Solicitud.</returns>
        [HttpPut("{id}/Request/{rid}")]
        public async Task<ActionResult<Collaborator>> UpdateRequest(string id, string rid, Request request)
        {
            // BDAP2-1
            var result = await _collaboratorService1.UpdateRequest(id, rid, request);
            // BDAP2-2
            var result2 = await _collaboratorService2.UpdateRequest(id, rid, request);
            // BDAP2-3
            var result3 = await _collaboratorService3.UpdateRequest(id, rid, request);

            if (result is null)
                return NotFound(string.Format("Error updating request with id = {0}.", rid));
            return Ok(result);
        }

        /// <summary>
        /// Request que elimina una Solicitud de un Colaborador en la base de datos.
        /// </summary>
        /// <param name="id">Id del Colaborador que hace la solicitud.</param>
        /// <param name="rid">Id de la Solicitud.</param>
        /// <returns> El modelo del Colaborador que hizo la Solicitud.</returns>
        [HttpDelete("{id}/Request/{rid}")]
        public async Task<ActionResult<Collaborator>> DeleteRequest(string id, string rid)
        {
            // BDAP2-1
            var result = await _collaboratorService1.DeleteRequest(id, rid);
            // BDAP2-2
            var result2 = await _collaboratorService2.DeleteRequest(id, rid);
            // BDAP2-3
            var result3 = await _collaboratorService3.DeleteRequest(id, rid);

            if (result is null)
                return NotFound(string.Format("Error deleting request with id = {0}.", rid));
            return Ok(result);
        }
    }

}
