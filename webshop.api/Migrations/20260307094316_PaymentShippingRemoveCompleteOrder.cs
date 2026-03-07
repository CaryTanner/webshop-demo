using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webshop.api.Migrations
{
    /// <inheritdoc />
    public partial class PaymentShippingRemoveCompleteOrder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$vEtzZa6jQkx06gvYBLHyM..KxRFeVNkfpb8NIgUCQTsJjIYWrSc6O");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "PasswordHash",
                value: "$2a$11$M.Zi5TGEzEJ0L459c8XRYetZY1q9Mv4IS84.MDZXwLSmnBNZVrZwa");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$KQDmm9hNE1Xao3VkH0Vz9O5S8.g0uLjRf7Xk023ug2wA9bbAzCvKy");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "PasswordHash",
                value: "$2a$11$2BTuwH/d5qkAWIBGAZn3nOfLIg6LERhk1qWl3XELgm5FFC0IIHiWu");
        }
    }
}
