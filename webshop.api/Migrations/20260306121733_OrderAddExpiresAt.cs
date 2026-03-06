using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webshop.api.Migrations
{
    /// <inheritdoc />
    public partial class OrderAddExpiresAt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ExpiresAt",
                table: "Orders",
                type: "TEXT",
                nullable: true);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ExpiresAt",
                table: "Orders");

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
    }
}
