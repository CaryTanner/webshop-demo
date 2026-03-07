using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webshop.api.Migrations
{
    /// <inheritdoc />
    public partial class AddCountryInfoTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Shippings_CountryInfo_CountryInfoId",
                table: "Shippings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CountryInfo",
                table: "CountryInfo");

            migrationBuilder.RenameTable(
                name: "CountryInfo",
                newName: "CountryInfos");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CountryInfos",
                table: "CountryInfos",
                column: "Id");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Shippings_CountryInfos_CountryInfoId",
                table: "Shippings",
                column: "CountryInfoId",
                principalTable: "CountryInfos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Shippings_CountryInfos_CountryInfoId",
                table: "Shippings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CountryInfos",
                table: "CountryInfos");

            migrationBuilder.RenameTable(
                name: "CountryInfos",
                newName: "CountryInfo");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CountryInfo",
                table: "CountryInfo",
                column: "Id");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Shippings_CountryInfo_CountryInfoId",
                table: "Shippings",
                column: "CountryInfoId",
                principalTable: "CountryInfo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
