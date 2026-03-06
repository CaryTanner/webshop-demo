using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webshop.api.Migrations
{
    /// <inheritdoc />
    public partial class AddPaymentOnDeliveryToPayment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                value: "$2a$11$ye2VU7LaE9bLWIGsfeOXVeYaPj40M6e2oTGpnqV7cif/UB5MyT21C");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "PasswordHash",
                value: "$2a$11$cOBTgDGAS7guPOuhYiKUxOumg6mBiKF8CwzzCdD9g/Z/bDyRGN1zS");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaymentOnDelivery",
                table: "Payments");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$UOCJv10ha9NwZaptzVhNJehOSx7KkISJAJMy.zrG4/RmMvrTy7yvq");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "PasswordHash",
                value: "$2a$11$lvShBx0bnEHOD53ZL4viluNEqtMqn/21xEOWyi68v.GWwgOIeyBJG");
        }
    }
}
