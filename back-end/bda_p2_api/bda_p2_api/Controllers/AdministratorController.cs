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

        [HttpGet("{id}")]
        public async Task<ActionResult<Administrator>> GetAdministrator(string id)
        {
            var result = await _administratorService.GetAdministrator(id);
            if (result is null)
                return NotFound(string.Format("There is no administrator with id = {0}.", id));
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> AddAdministrators(Administrator administrator)
        {
            await _administratorService.AddAdministrator(administrator);
            return CreatedAtAction(nameof(GetAllAdministrators), new { id = administrator.id }, administrator );
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdministrator(string id)
        {
            await _administratorService.DeleteAdministrator(id);
            return NoContent();
        }

    }
}
