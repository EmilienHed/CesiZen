using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CesiZen.Data;
using CesiZen.Models;
using CesiZen.Models.DTOs;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CesiZen.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RespirationExercisesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RespirationExercisesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/RespirationExercises
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RespirationExercise>>> GetRespirationExercises()
        {
            return await _context.RespirationExercises.ToListAsync();
        }

        // GET: api/RespirationExercises/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RespirationExercise>> GetRespirationExercise(int id)
        {
            var exercise = await _context.RespirationExercises.FindAsync(id);

            if (exercise == null)
            {
                return NotFound();
            }

            return exercise;
        }

        // GET: api/RespirationExercises/defaults
        [HttpGet("defaults")]
        public async Task<ActionResult<IEnumerable<RespirationExercise>>> GetDefaultExercises()
        {
            return await _context.RespirationExercises
                .Where(e => e.IsDefault)
                .ToListAsync();
        }

        // POST: api/RespirationExercises
        [HttpPost]
        public async Task<ActionResult<RespirationExercise>> CreateRespirationExercise(RespirationExerciseDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var exercise = new RespirationExercise
            {
                Name = dto.Name,
                InspirationDuration = dto.InspirationDuration,
                HoldDuration = dto.HoldDuration,
                ExpirationDuration = dto.ExpirationDuration,
                Description = dto.Description,
                IsDefault = false
            };

            _context.RespirationExercises.Add(exercise);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRespirationExercise), new { id = exercise.Id }, exercise);
        }

        // PUT: api/RespirationExercises/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRespirationExercise(int id, RespirationExerciseDto dto)
        {
            if (id != dto.Id)
                return BadRequest();

            var exercise = await _context.RespirationExercises.FindAsync(id);
            if (exercise == null)
                return NotFound();

            exercise.Name = dto.Name;
            exercise.InspirationDuration = dto.InspirationDuration;
            exercise.HoldDuration = dto.HoldDuration;
            exercise.ExpirationDuration = dto.ExpirationDuration;
            exercise.Description = dto.Description;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExerciseExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/RespirationExercises/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRespirationExercise(int id)
        {
            var exercise = await _context.RespirationExercises.FindAsync(id);
            if (exercise == null)
                return NotFound();

            // Empêcher la suppression des exercices par défaut
            if (exercise.IsDefault)
                return BadRequest("Les exercices par défaut ne peuvent pas être supprimés.");

            _context.RespirationExercises.Remove(exercise);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ExerciseExists(int id)
        {
            return _context.RespirationExercises.Any(e => e.Id == id);
        }
    }
}