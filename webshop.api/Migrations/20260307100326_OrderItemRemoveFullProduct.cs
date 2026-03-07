using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webshop.api.Migrations
{
    /// <inheritdoc />
    public partial class OrderItemRemoveFullProduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$raGobZ5LL4zunSCZseN8CuEDfOXDtGbm1TQkX1FwGCa6Wxl0bAja6");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "PasswordHash",
                value: "$2a$11$xGiMaOtTk0hwic2J74aICO97C.wAMXFv4qqFO4xwwq45rxqDsuouq");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
    }
}
