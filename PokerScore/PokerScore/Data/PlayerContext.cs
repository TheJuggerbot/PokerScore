using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PokerScore.Models;

namespace PokerScore.Data
{
    public class PlayerContext : DbContext
    {
        public PlayerContext (DbContextOptions<PlayerContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Player>()
                .Property(p => p.PlayerWinnings)
                .HasColumnType("decimal(18,2)");
        }

        public DbSet<PokerScore.Models.Player> Player { get; set; }
    }
}
