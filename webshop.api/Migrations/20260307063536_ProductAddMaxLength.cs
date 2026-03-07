using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webshop.api.Migrations
{
    /// <inheritdoc />
    public partial class ProductAddMaxLength : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$XpRP4PepF7G52xYpgHp2C.QjXJVMO6912L0DTDx1w24N4S0YwmtfK");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "PasswordHash",
                value: "$2a$11$bnvZIFoFWesAJgKtRVuNBOqRrRw2pk2dRBimOFLuFMdKviwVNw2Tm");
        }
    }
}
