using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webshop.api.Migrations
{
    /// <inheritdoc />
    public partial class SeedUpdateUserEmail : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Email", "PasswordHash" },
                values: new object[] { "admin@email.com", "$2a$11$EvtSX5xCc4oPUB5p21fmTO2lxOi3hJ6GFZRnye9tsOCxwHmSxZLCC" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Email", "PasswordHash" },
                values: new object[] { "not.admin@email.com", "$2a$11$OrZWyKK4tT2sQiBTtw6KZORbe9vqV8U0Qiod4kNEzblSsMCOztRri" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Email", "PasswordHash" },
                values: new object[] { "admin.one@cgitest.com", "$2a$11$RxQphX72zIU7HHMkszsXDebmZNFwsyQ7q17D5fLwNxlHJbcrL4DN2" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Email", "PasswordHash" },
                values: new object[] { "not.admin@cgitest.com", "$2a$11$PBND9MhHwPdFZrsC4QA2VOz7.ceH2.72MTnrebJsCvZT4p1p93SE." });
        }
    }
}
