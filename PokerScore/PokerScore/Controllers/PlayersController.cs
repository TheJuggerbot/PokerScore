using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PokerScore.Data;
using PokerScore.Models;

namespace PokerScore.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class PlayersController : ControllerBase
    {
        private readonly PlayerContext _context;
        private readonly IDataRepository<Player> _repo;

        public PlayersController(PlayerContext context, IDataRepository<Player> repo)
        {
            _context = context;
            _repo = repo;
        }

        // GET: api/Players
        [HttpGet]
        public IEnumerable<Player> GetPlayer()
        {
            return _context.Player.OrderByDescending(p => p.PlayerId);
        }

        // GET: api/Players/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPlayer([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var player = await _context.Player.FindAsync(id);

            if (player == null)
            {
                return NotFound();
            }

            return Ok(player);
        }

        // PUT: api/Players/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlayer([FromRoute] int id, [FromBody] Player player)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != player.PlayerId)
            {
                return BadRequest();
            }

            _context.Entry(player).State = EntityState.Modified;

            try
            {
                _repo.Update(player);
                // TODO
                var save = await _repo.SaveAsync(player);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlayerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Players
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<IActionResult> PostPlayer([FromBody] Player player)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _repo.Add(player);
            var save = await _repo.SaveAsync(player);

            return CreatedAtAction("GetPlayer", new { id = player.PlayerId }, player);
        }

        // DELETE: api/Players/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlayer([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var player = await _context.Player.FindAsync(id);
            if (player == null)
            {
                return NotFound();
            }

            _repo.Delete(player);
            var save = await _repo.SaveAsync(player);

            return Ok(player);
        }

        private bool PlayerExists(int id)
        {
            return _context.Player.Any(e => e.PlayerId == id);
        }
    }
}
