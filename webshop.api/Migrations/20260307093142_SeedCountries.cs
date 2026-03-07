using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace webshop.api.Migrations
{
    /// <inheritdoc />
    public partial class SeedCountries : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Country",
                table: "Shippings");

            migrationBuilder.AddColumn<int>(
                name: "CountryInfoId",
                table: "Shippings",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "CountryInfo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CountryCode = table.Column<string>(type: "TEXT", nullable: false),
                    CountryName = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CountryInfo", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "CountryInfo",
                columns: new[] { "Id", "CountryCode", "CountryName" },
                values: new object[,]
                {
                    { 1, "AT", "Austria" },
                    { 2, "BE", "Belgium" },
                    { 3, "BG", "Bulgaria" },
                    { 4, "HR", "Croatia" },
                    { 5, "CY", "Cyprus" },
                    { 6, "CZ", "Czech Republic" },
                    { 7, "DK", "Denmark" },
                    { 8, "EE", "Estonia" },
                    { 9, "FI", "Finland" },
                    { 10, "FR", "France" },
                    { 11, "DE", "Germany" },
                    { 12, "GR", "Greece" },
                    { 13, "HU", "Hungary" },
                    { 14, "IE", "Ireland" },
                    { 15, "IT", "Italy" },
                    { 16, "LV", "Latvia" },
                    { 17, "LT", "Lithuania" },
                    { 18, "LU", "Luxembourg" },
                    { 19, "MT", "Malta" },
                    { 20, "NL", "Netherlands" },
                    { 21, "PL", "Poland" },
                    { 22, "PT", "Portugal" },
                    { 23, "RO", "Romania" },
                    { 24, "SK", "Slovakia" },
                    { 25, "SI", "Slovenia" },
                    { 26, "ES", "Spain" },
                    { 27, "SE", "Sweden" }
                });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$pz8XXCti/9fxzYE9f.mLyeyJDeQeLLwIlA8RoCWuJ3P0DYaPe5ZqO");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "PasswordHash",
                value: "$2a$11$5GFhjrESBV8U41rDR0LjcOlkOXks0X23bYYjYL60f2Tatn93YV8KK");

            migrationBuilder.CreateIndex(
                name: "IX_Shippings_CountryInfoId",
                table: "Shippings",
                column: "CountryInfoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Shippings_CountryInfo_CountryInfoId",
                table: "Shippings",
                column: "CountryInfoId",
                principalTable: "CountryInfo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Shippings_CountryInfo_CountryInfoId",
                table: "Shippings");

            migrationBuilder.DropTable(
                name: "CountryInfo");

            migrationBuilder.DropIndex(
                name: "IX_Shippings_CountryInfoId",
                table: "Shippings");

            migrationBuilder.DropColumn(
                name: "CountryInfoId",
                table: "Shippings");

            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "Shippings",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$1ZgH7ZYnidiR1zyqQJvDk.r6jSHmNuzhkyxLnS.ZksKjtcVTBy8C.");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "PasswordHash",
                value: "$2a$11$VGTUMhLNxvxZO0FdSIGh3eYiiWeRW0HYYOG.7wdT49X2nDwMHtWyS");
        }
    }
}
