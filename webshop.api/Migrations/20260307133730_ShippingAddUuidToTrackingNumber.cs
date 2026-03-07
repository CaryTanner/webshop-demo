using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webshop.api.Migrations
{
    /// <inheritdoc />
    public partial class ShippingAddUuidToTrackingNumber : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$/PkfUuhXjIxVhd5KnawXbutqkw4dfUWZrtSIetAu0UDtR9fwDTCGK");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "PasswordHash",
                value: "$2a$11$aIv2cGetmsmbCVZjIIThreHLPYVs8u0gGwLSRNlTHaWCqlp4tzXjS");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
    }
}
