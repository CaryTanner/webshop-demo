using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webshop.api.Migrations
{
    /// <inheritdoc />
    public partial class OrderAddAddressLineTwoPaymentAddStripe : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaymentOnDelivery",
                table: "Payments");

            migrationBuilder.RenameColumn(
                name: "FullName",
                table: "Shippings",
                newName: "LastName");

            migrationBuilder.RenameColumn(
                name: "Address",
                table: "Shippings",
                newName: "FirstName");

            migrationBuilder.AddColumn<string>(
                name: "AddressLineOne",
                table: "Shippings",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AddressLineTwo",
                table: "Shippings",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StripePaymentIntentId",
                table: "Payments",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AddressLineOne",
                table: "Shippings");

            migrationBuilder.DropColumn(
                name: "AddressLineTwo",
                table: "Shippings");

            migrationBuilder.DropColumn(
                name: "StripePaymentIntentId",
                table: "Payments");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "Shippings",
                newName: "FullName");

            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "Shippings",
                newName: "Address");

            migrationBuilder.AddColumn<bool>(
                name: "PaymentOnDelivery",
                table: "Payments",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$fv2kOac4MYeKsRNEVpCbBuKaIpjyXFKOIiwomvHwttpsA7Ev1GPH.");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "PasswordHash",
                value: "$2a$11$se.w64uK/PN7JeoFRGesVOgQDjISA71kgZriDer9NiWCEHgfbw38.");
        }
    }
}
