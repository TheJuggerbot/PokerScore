using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PokerScore.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Player",
                columns: table => new
                {
                    PlayerId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PlayerName = table.Column<string>(nullable: false),
                    PlayerWinnings = table.Column<decimal>(nullable: false),
                    Country = table.Column<string>(nullable: false),
                    DateWon = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Player", x => x.PlayerId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Player");
        }
    }
}
