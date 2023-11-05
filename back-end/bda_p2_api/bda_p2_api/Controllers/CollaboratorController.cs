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

        [HttpGet("{id}")]
        public async Task<ActionResult<Collaborator>> GetCollaborator(string id)
        {
            var result = await _collaboratorService.GetCollaborator(id);
            if (result is null)
                return NotFound(string.Format("There is no collaborator with id = {0}.", id));
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> AddCollaborator(Collaborator collaborator)
        {
            await _collaboratorService.AddCollaborator(collaborator);
            return CreatedAtAction(nameof(GetAllCollaborators), new { id = collaborator.id }, collaborator);
        }

        [HttpPut("Request/{id}")]
        public async Task<IActionResult> AddRequest(string id, Request request)
        {
            await _collaboratorService.AddRequest(id, request);
            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCollaborator(string id)
        {
            await _collaboratorService.DeleteCollaborator(id);
            return NoContent();
        }

    }

}
