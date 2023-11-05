using System;
using bda_p2_api.Models;
using bda_p2_api.Services;
using bda_p2_api.Services.AdministratorService;
using Microsoft.AspNetCore.Mvc;

namespace bda_p2_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdministratorController : Controller
    {
        private readonly MongoDBService1 _administratorService;

        // Constructor
        public AdministratorController(MongoDBService1 administratorService)
        {
            _administratorService = administratorService;
        }

        [HttpGet]
        public async Task<List<Administrator>> GetAllAdministrators()
        {
            return await _administratorService.GetAllAdministrators();
        }

        /// <summary>
        /// Request que obtiene un Administrador de la base de datos.
        /// </summary>
        /// <param name="id">Id del Administrador por buscar.</param>
        /// <returns>Modelo del Administrador que se encuentra.</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Administrator>> GetAdministrator(string id)
        {
            var result = await _administratorService.GetAdministrator(id);
            if (result is null)
                return NotFound(string.Format("There is no administrator with id = {0}.", id));
            return Ok(result);
        }

        /// <summary>
        /// Request para agregar un Administrador en la base de datos.
        /// </summary>
        /// <param name="id">Modelo del Administrador por agregar.</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> RegisterAdministrators(Administrator administrator)
        {
            await _administratorService.RegisterAdministrator(administrator);
            return CreatedAtAction(nameof(GetAllAdministrators), new { id = administrator.id }, administrator );
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdministrator(string id)
        {
            await _administratorService.DeleteAdministrator(id);
            return NoContent();
        }

        /* ****************************************************** Solicitudes ****************************************************** */


        /// <summary>
        /// Request para obtener todas las solicitudes que tienen "Pendiente" como estado.
        /// </summary>
        /// <returns>Lista de Solicitudes pendientes.</returns>
        [HttpGet("Request/Pending")]
        public async Task<ActionResult<List<Request>>> GetPendingRequests()
        {
            var result = await _administratorService.GetPendingRequests();
            if (result is null)
                return NotFound(string.Format("There are no pending requests."));
            return Ok(result);
        }

    }
}
