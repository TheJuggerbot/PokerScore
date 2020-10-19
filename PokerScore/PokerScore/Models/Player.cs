using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PokerScore.Models
{
    public class Player
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PlayerId { get; set; }
        
        [Required]
        public string PlayerName { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal PlayerWinnings { get; set; }

        [Required]
        public string Country { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime DateWon { get; set; }
    }
}
