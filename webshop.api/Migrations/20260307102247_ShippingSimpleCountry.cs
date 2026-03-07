using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace webshop.api.Migrations
{
    /// <inheritdoc />
    public partial class ShippingSimpleCountry : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Shippings_CountryInfos_CountryInfoId",
                table: "Shippings");

            migrationBuilder.DropTable(
                name: "CountryInfos");

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
                value: "$2a$11$ESqmeIwWCPFFNPoQ81wCzONa2RR6h9wskRhYpBWaunsyz08/h9Dcq");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "PasswordHash",
                value: "$2a$11$twm1XXW9JJScF5HtNXNNTOvL/1N1icGnymR9fieEbJ3zS2fYN.zzO");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                name: "CountryInfos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CountryCode = table.Column<string>(type: "TEXT", nullable: false),
                    CountryName = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CountryInfos", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "CountryInfos",
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
                value: "$2a$11$ZLZdaFu/XoYoboZfHwl0KObXyZ9aweWv2SE6ll7wWFkMvsszfKHzC");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "PasswordHash",
                value: "$2a$11$UNB0kZAo841m2RwR5oEzi.g996jL2Em5UsnSiTzP.3FTsUsmKJZVq");

            migrationBuilder.CreateIndex(
                name: "IX_Shippings_CountryInfoId",
                table: "Shippings",
                column: "CountryInfoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Shippings_CountryInfos_CountryInfoId",
                table: "Shippings",
                column: "CountryInfoId",
                principalTable: "CountryInfos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
