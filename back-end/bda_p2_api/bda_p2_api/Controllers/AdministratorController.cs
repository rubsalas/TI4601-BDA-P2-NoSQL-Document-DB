using bda_p2_api.Models;
using bda_p2_api.Services;
using Microsoft.AspNetCore.Mvc;

namespace bda_p2_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdministratorController : Controller
    {
        private readonly MongoDBService1 _administratorService1;
        private readonly MongoDBService2 _administratorService2;
        private readonly MongoDBService3 _administratorService3;

        // Constructor
        public AdministratorController(MongoDBService1 administratorService1, MongoDBService2 administratorService2, MongoDBService3 administratorService3)
        {
            _administratorService1 = administratorService1;
            _administratorService2 = administratorService2;
            _administratorService3 = administratorService3;
        }

        /// <summary>
        /// Request que obtiene todos los Administradores.
        /// </summary>
        /// <returns>Lista de modelos de todos los Administradores.</returns>
        [HttpGet]
        public async Task<List<Administrator>> GetAllAdministrators()
        {
            return await _administratorService1.GetAllAdministrators();
        }

        /// <summary>
        /// Request que obtiene un Administrador de la base de datos.
        /// </summary>
        /// <param name="id">Id del Administrador por buscar.</param>
        /// <returns>Modelo del Administrador que se encuentra.</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Administrator>> GetAdministrator(string id)
        {
            var result = await _administratorService1.GetAdministrator(id);
            if (result is null)
                return NotFound(string.Format("There is no administrator with id = {0}.", id));
            return Ok(result);
        }

        /// <summary>
        /// Request para agregar un Administrador en la base de datos.
        /// </summary>
        /// <param name="administrator">Modelo del Administrador por agregar.</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> RegisterAdministrators(Administrator administrator)
        {   
            // BDAP2-1
            await _administratorService1.RegisterAdministrator(administrator);
            // BDAP2-2
            await _administratorService2.RegisterAdministrator(administrator);
            // BDAP2-3
            await _administratorService3.RegisterAdministrator(administrator);

            return CreatedAtAction(nameof(GetAllAdministrators), new { id = administrator.id }, administrator );
        }

        /// <summary>
        /// Request que elimina un Administrador de la base de datos.
        /// </summary>
        /// <param name="id">Id del Administrador por eliminar.</param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdministrator(string id)
        {
            // BDAP2-1
            await _administratorService1.DeleteAdministrator(id);
            // BDAP2-2
            await _administratorService2.DeleteAdministrator(id);
            // BDAP2-3
            await _administratorService3.DeleteAdministrator(id);

            return Ok();
        }


        /* ****************************************************** Solicitudes ****************************************************** */


        /// <summary>
        /// Request para obtener todas las solicitudes con el respectivo id del Colaborador.
        /// </summary>
        /// <returns>Lista de Solicitudes con el id del Colaborador.</returns>
        [HttpGet("Request")]
        public async Task<ActionResult<List<CollaboratorsRequest>>> GetAllCollaboratorsRequests()
        {
            var result = await _administratorService1.GetAllCollaboratorsRequests();
            if (result is null)
                return NotFound(string.Format("There are no requests."));
            return Ok(result);
        }

        /// <summary>
        /// Request para obtener todas las solicitudes que tienen "Pendiente" como estado.
        /// </summary>
        /// <returns>Lista de Solicitudes pendientes.</returns>
        [HttpGet("Request/Pending")]
        public async Task<ActionResult<List<Request>>> GetPendingRequests()
        {
            var result = await _administratorService1.GetPendingRequests();
            if (result is null)
                return NotFound(string.Format("There are no pending requests."));
            return Ok(result);
        }

    }
}
