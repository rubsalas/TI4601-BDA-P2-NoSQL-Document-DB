using System;
using bda_p2_api.Models;
using bda_p2_api.Services;
using bda_p2_api.Services.CollaboratorService;
using Microsoft.AspNetCore.Mvc;

namespace bda_p2_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CollaboratorController : Controller
    {
        private readonly MongoDBService1 _collaboratorService;

        // Constructor
        public CollaboratorController(MongoDBService1 collaboratorService)
        {
            _collaboratorService = collaboratorService;
        }

        [HttpGet]
        public async Task<List<Collaborator>> GetAllCollaborators()
        {
            return await _collaboratorService.GetAllCollaborators();
        }

        /// <summary>
        /// Request que obtiene un Colaborador de la base de datos.
        /// </summary>
        /// <param name="id">Id del Colaborador por buscar.</param>
        /// <returns>Modelo del Colaborador que se encuentra.</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Collaborator>> GetCollaborator(string id)
        {
            var result = await _collaboratorService.GetCollaborator(id);
            if (result is null)
                return NotFound(string.Format("There is no collaborator with id = {0}.", id));
            return Ok(result);
        }

        /// <summary>
        /// Request para agregar un Colaborador en la base de datos.
        /// </summary>
        /// <param name="id">Modelo del Colaborador por agregar.</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> RegisterCollaborator(Collaborator collaborator)
        {
            await _collaboratorService.RegisterCollaborator(collaborator);
            return CreatedAtAction(nameof(GetAllCollaborators), new { id = collaborator.id }, collaborator);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCollaborator(string id)
        {
            await _collaboratorService.DeleteCollaborator(id);
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
            var result = await _collaboratorService.GetCollaboratorsRequests(id);
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
        [HttpPut("{id}/Request")]
        public async Task<ActionResult<Collaborator>> MakeRequest(string id, Request request)
        {
            string uniqueId = $"{DateTime.Now:yyyyMMddHHmmssfff}-{Guid.NewGuid()}";
            request.id = uniqueId.Replace("-", ""); ;
            var result = await _collaboratorService.MakeRequest(id, request);
            if (result is null)
                return NotFound(string.Format("There is no Collaborator with id = {0}.", id));
            return Ok(result);
        }

    }

}
