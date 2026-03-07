using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webshop.api.Migrations
{
    /// <inheritdoc />
    public partial class OrderItemRemoveCompleteOrder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
        }
    }
}
