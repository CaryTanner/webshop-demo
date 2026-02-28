using Microsoft.EntityFrameworkCore;
public class WebshopContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
    public DbSet<Payment> Payments { get; set; }
    public DbSet<Shipping> Shippings { get; set; }

    public WebshopContext(DbContextOptions<WebshopContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>().HasData(
            new Category { Id = 1, Name = "Resistors" },
            new Category { Id = 2, Name = "Capacitors" },
            new Category { Id = 3, Name = "Inductors" },
            new Category { Id = 4, Name = "Semiconductors" },
            new Category { Id = 5, Name = "Microcontrollers" },
            new Category { Id = 6, Name = "Power" },
            new Category { Id = 7, Name = "Connectors" },
            new Category { Id = 8, Name = "Sensors" },
            new Category { Id = 9, Name = "Displays" },
            new Category { Id = 10, Name = "Passive Components" }
        );

        modelBuilder.Entity<Product>().HasData(
            new Product { Id = 1, Name = "1kΩ Resistor", Description = "General purpose 1kΩ through-hole resistor", SvgType = SvgType.Resistor, Price = 1, Stock = 500 },
            new Product { Id = 2, Name = "4.7kΩ Resistor", Description = "General purpose 4.7kΩ through-hole resistor", SvgType = SvgType.Resistor, Price = 1, Stock = 500 },
            new Product { Id = 3, Name = "220Ω Resistor", Description = "Common LED current limiting resistor", SvgType = SvgType.Resistor, Price = 1, Stock = 500 },
            new Product { Id = 4, Name = "1MΩ Resistor", Description = "High resistance through-hole resistor", SvgType = SvgType.Resistor, Price = 1, Stock = 300 },
            new Product { Id = 5, Name = "10kΩ Potentiometer", Description = "Adjustable rotary resistor", SvgType = SvgType.Resistor, Price = 15, Stock = 150 },
            new Product { Id = 6, Name = "470µF Electrolytic Capacitor", Description = "Large electrolytic capacitor 25V", SvgType = SvgType.Capacitor, Price = 5, Stock = 200 },
            new Product { Id = 7, Name = "1µF Film Capacitor", Description = "Polyester film capacitor", SvgType = SvgType.Capacitor, Price = 3, Stock = 200 },
            new Product { Id = 8, Name = "22pF Ceramic Capacitor", Description = "Small ceramic capacitor for oscillators", SvgType = SvgType.Capacitor, Price = 2, Stock = 400 },
            new Product { Id = 9, Name = "0.1µF Bypass Capacitor", Description = "Decoupling capacitor for power lines", SvgType = SvgType.Capacitor, Price = 2, Stock = 400 },
            new Product { Id = 10, Name = "1000µF Electrolytic Capacitor", Description = "Large smoothing capacitor 16V", SvgType = SvgType.Capacitor, Price = 6, Stock = 150 },
            new Product { Id = 11, Name = "100µH Inductor", Description = "Small signal inductor", SvgType = SvgType.Inductor, Price = 5, Stock = 200 },
            new Product { Id = 12, Name = "1mH Inductor", Description = "Through-hole power inductor", SvgType = SvgType.Inductor, Price = 8, Stock = 150 },
            new Product { Id = 13, Name = "47µH SMD Inductor", Description = "Surface mount inductor for compact designs", SvgType = SvgType.Inductor, Price = 9, Stock = 100 },
            new Product { Id = 14, Name = "Blue LED", Description = "5mm blue LED 3.2V forward voltage", SvgType = SvgType.Led, Price = 2, Stock = 300 },
            new Product { Id = 15, Name = "Green LED", Description = "5mm green LED 2.1V forward voltage", SvgType = SvgType.Led, Price = 2, Stock = 300 },
            new Product { Id = 16, Name = "RGB LED", Description = "5mm common cathode RGB LED", SvgType = SvgType.Led, Price = 5, Stock = 200 },
            new Product { Id = 17, Name = "IR LED", Description = "Infrared LED 940nm for remote control", SvgType = SvgType.Led, Price = 3, Stock = 200 },
            new Product { Id = 18, Name = "PNP Transistor BC557", Description = "General purpose PNP transistor", SvgType = SvgType.Transistor, Price = 3, Stock = 200 },
            new Product { Id = 19, Name = "MOSFET IRF540N", Description = "N-channel power MOSFET", SvgType = SvgType.Transistor, Price = 15, Stock = 100 },
            new Product { Id = 20, Name = "1N4007 Diode", Description = "General purpose rectifier diode", SvgType = SvgType.Semiconductor, Price = 2, Stock = 400 },
            new Product { Id = 21, Name = "Zener Diode 5.1V", Description = "5.1V voltage reference zener diode", SvgType = SvgType.Semiconductor, Price = 2, Stock = 300 },
            new Product { Id = 22, Name = "NE555 Timer IC", Description = "Classic 555 timer integrated circuit", SvgType = SvgType.IcChip, Price = 6, Stock = 200 },
            new Product { Id = 23, Name = "LM358 Op-Amp", Description = "Dual operational amplifier IC", SvgType = SvgType.IcChip, Price = 8, Stock = 150 },
            new Product { Id = 24, Name = "74HC595 Shift Register", Description = "8-bit serial to parallel shift register", SvgType = SvgType.IcChip, Price = 9, Stock = 150 },
            new Product { Id = 25, Name = "ATtiny85", Description = "8-bit AVR microcontroller in DIP-8 package", SvgType = SvgType.Microcontroller, Price = 25, Stock = 75 },
            new Product { Id = 26, Name = "Arduino Nano", Description = "Compact Arduino board with ATmega328P", SvgType = SvgType.Microcontroller, Price = 89, Stock = 50 },
            new Product { Id = 27, Name = "Arduino Mega", Description = "Arduino board with ATmega2560, 54 I/O pins", SvgType = SvgType.Microcontroller, Price = 189, Stock = 30 },
            new Product { Id = 28, Name = "STM32 Blue Pill", Description = "STM32F103 ARM Cortex-M3 development board", SvgType = SvgType.Microcontroller, Price = 49, Stock = 40 },
            new Product { Id = 29, Name = "ESP8266 NodeMCU", Description = "WiFi enabled microcontroller board", SvgType = SvgType.Microcontroller, Price = 59, Stock = 60 },
            new Product { Id = 30, Name = "LM317 Voltage Regulator", Description = "Adjustable positive voltage regulator", SvgType = SvgType.IcChip, Price = 9, Stock = 150 },
            new Product { Id = 31, Name = "LM7812 Voltage Regulator", Description = "12V fixed positive voltage regulator", SvgType = SvgType.IcChip, Price = 9, Stock = 150 },
            new Product { Id = 32, Name = "LiPo Charger Module", Description = "TP4056 single cell LiPo charger", SvgType = SvgType.IcChip, Price = 19, Stock = 80 },
            new Product { Id = 33, Name = "Step-Up Boost Converter", Description = "MT3608 boost converter module 2-24V", SvgType = SvgType.IcChip, Price = 25, Stock = 60 },
            new Product { Id = 34, Name = "AA Battery Holder 4x", Description = "4xAA battery holder with switch", SvgType = SvgType.Battery, Price = 15, Stock = 100 },
            new Product { Id = 35, Name = "9V Battery Snap", Description = "9V battery snap connector leads", SvgType = SvgType.Connector, Price = 5, Stock = 150 },
            new Product { Id = 36, Name = "Male Pin Headers 40-pin", Description = "2.54mm pitch breakaway pin headers", SvgType = SvgType.Connector, Price = 6, Stock = 300 },
            new Product { Id = 37, Name = "Female Pin Headers 40-pin", Description = "2.54mm pitch female pin headers", SvgType = SvgType.Connector, Price = 7, Stock = 300 },
            new Product { Id = 38, Name = "USB-A to USB-B Cable", Description = "Standard USB cable for Arduino", SvgType = SvgType.Connector, Price = 29, Stock = 100 },
            new Product { Id = 39, Name = "Micro USB Cable", Description = "Micro USB data and charging cable", SvgType = SvgType.Connector, Price = 25, Stock = 100 },
            new Product { Id = 40, Name = "Screw Terminal 2-pin", Description = "2.54mm pitch PCB screw terminal", SvgType = SvgType.Connector, Price = 4, Stock = 200 },
            new Product { Id = 41, Name = "Screw Terminal 3-pin", Description = "2.54mm pitch PCB screw terminal", SvgType = SvgType.Connector, Price = 5, Stock = 200 },
            new Product { Id = 42, Name = "Soil Moisture Sensor", Description = "Analog and digital soil moisture detection", SvgType = SvgType.Sensor, Price = 29, Stock = 60 },
            new Product { Id = 43, Name = "Sound Sensor Module", Description = "Microphone sound detection module", SvgType = SvgType.Sensor, Price = 25, Stock = 60 },
            new Product { Id = 44, Name = "Flame Sensor Module", Description = "IR flame detection sensor", SvgType = SvgType.Sensor, Price = 19, Stock = 60 },
            new Product { Id = 45, Name = "Gas Sensor MQ-2", Description = "Flammable gas and smoke sensor", SvgType = SvgType.Sensor, Price = 35, Stock = 50 },
            new Product { Id = 46, Name = "Gyroscope MPU-6050", Description = "6-axis accelerometer and gyroscope", SvgType = SvgType.Sensor, Price = 49, Stock = 40 },
            new Product { Id = 47, Name = "Barometric Pressure Sensor BMP280", Description = "I2C pressure and temperature sensor", SvgType = SvgType.Sensor, Price = 39, Stock = 50 },
            new Product { Id = 48, Name = "TFT LCD 1.8\"", Description = "128x160 color TFT display SPI", SvgType = SvgType.Display, Price = 69, Stock = 40 },
            new Product { Id = 49, Name = "E-Paper Display 2.9\"", Description = "296x128 e-ink display module", SvgType = SvgType.Display, Price = 149, Stock = 20 },
            new Product { Id = 50, Name = "LED Matrix 8x8", Description = "MAX7219 8x8 LED dot matrix module", SvgType = SvgType.Display, Price = 39, Stock = 60 }
        );

        modelBuilder.Entity<Product>()
            .HasMany(p => p.Categories)
            .WithMany(c => c.Products)
            .UsingEntity(j => j.HasData(// Product 1 - 1kΩ Resistor (Resistors, Passive Components)
            new { ProductsId = 1, CategoriesId = 1 },
            new { ProductsId = 1, CategoriesId = 10 },
            // Product 2 - 4.7kΩ Resistor (Resistors, Passive Components)
            new { ProductsId = 2, CategoriesId = 1 },
            new { ProductsId = 2, CategoriesId = 10 },
            // Product 3 - 220Ω Resistor (Resistors, Passive Components)
            new { ProductsId = 3, CategoriesId = 1 },
            new { ProductsId = 3, CategoriesId = 10 },
            // Product 4 - 1MΩ Resistor (Resistors, Passive Components)
            new { ProductsId = 4, CategoriesId = 1 },
            new { ProductsId = 4, CategoriesId = 10 },
            // Product 5 - 10kΩ Potentiometer (Resistors, Passive Components)
            new { ProductsId = 5, CategoriesId = 1 },
            new { ProductsId = 5, CategoriesId = 10 },
            // Product 6 - 470µF Electrolytic Capacitor (Capacitors, Passive Components)
            new { ProductsId = 6, CategoriesId = 2 },
            new { ProductsId = 6, CategoriesId = 10 },
            // Product 7 - 1µF Film Capacitor (Capacitors, Passive Components)
            new { ProductsId = 7, CategoriesId = 2 },
            new { ProductsId = 7, CategoriesId = 10 },
            // Product 8 - 22pF Ceramic Capacitor (Capacitors, Passive Components)
            new { ProductsId = 8, CategoriesId = 2 },
            new { ProductsId = 8, CategoriesId = 10 },
            // Product 9 - 0.1µF Bypass Capacitor (Capacitors, Passive Components)
            new { ProductsId = 9, CategoriesId = 2 },
            new { ProductsId = 9, CategoriesId = 10 },
            // Product 10 - 1000µF Electrolytic Capacitor (Capacitors, Passive Components)
            new { ProductsId = 10, CategoriesId = 2 },
            new { ProductsId = 10, CategoriesId = 10 },
            // Product 11 - 100µH Inductor (Inductors, Passive Components)
            new { ProductsId = 11, CategoriesId = 3 },
            new { ProductsId = 11, CategoriesId = 10 },
            // Product 12 - 1mH Inductor (Inductors, Passive Components)
            new { ProductsId = 12, CategoriesId = 3 },
            new { ProductsId = 12, CategoriesId = 10 },
            // Product 13 - 47µH SMD Inductor (Inductors, Passive Components)
            new { ProductsId = 13, CategoriesId = 3 },
            new { ProductsId = 13, CategoriesId = 10 },
            // Product 14 - Blue LED (Semiconductors)
            new { ProductsId = 14, CategoriesId = 4 },
            // Product 15 - Green LED (Semiconductors)
            new { ProductsId = 15, CategoriesId = 4 },
            // Product 16 - RGB LED (Semiconductors)
            new { ProductsId = 16, CategoriesId = 4 },
            // Product 17 - IR LED (Semiconductors)
            new { ProductsId = 17, CategoriesId = 4 },
            // Product 18 - PNP Transistor BC557 (Semiconductors)
            new { ProductsId = 18, CategoriesId = 4 },
            // Product 19 - MOSFET IRF540N (Semiconductors)
            new { ProductsId = 19, CategoriesId = 4 },
            // Product 20 - 1N4007 Diode (Semiconductors)
            new { ProductsId = 20, CategoriesId = 4 },
            // Product 21 - Zener Diode 5.1V (Semiconductors)
            new { ProductsId = 21, CategoriesId = 4 },
            // Product 22 - NE555 Timer IC (Semiconductors, Passive Components)
            new { ProductsId = 22, CategoriesId = 4 },
            new { ProductsId = 22, CategoriesId = 10 },
            // Product 23 - LM358 Op-Amp (Semiconductors)
            new { ProductsId = 23, CategoriesId = 4 },
            // Product 24 - 74HC595 Shift Register (Semiconductors)
            new { ProductsId = 24, CategoriesId = 4 },
            // Product 25 - ATtiny85 (Semiconductors, Microcontrollers)
            new { ProductsId = 25, CategoriesId = 4 },
            new { ProductsId = 25, CategoriesId = 5 },
            // Product 26 - Arduino Nano (Microcontrollers)
            new { ProductsId = 26, CategoriesId = 5 },
            // Product 27 - Arduino Mega (Microcontrollers)
            new { ProductsId = 27, CategoriesId = 5 },
            // Product 28 - STM32 Blue Pill (Microcontrollers)
            new { ProductsId = 28, CategoriesId = 5 },
            // Product 29 - ESP8266 NodeMCU (Microcontrollers, Sensors)
            new { ProductsId = 29, CategoriesId = 5 },
            new { ProductsId = 29, CategoriesId = 8 },
            // Product 30 - LM317 Voltage Regulator (Power, Semiconductors)
            new { ProductsId = 30, CategoriesId = 6 },
            new { ProductsId = 30, CategoriesId = 4 },
            // Product 31 - LM7812 Voltage Regulator (Power, Semiconductors)
            new { ProductsId = 31, CategoriesId = 6 },
            new { ProductsId = 31, CategoriesId = 4 },
            // Product 32 - LiPo Charger Module (Power)
            new { ProductsId = 32, CategoriesId = 6 },
            // Product 33 - Step-Up Boost Converter (Power)
            new { ProductsId = 33, CategoriesId = 6 },
            // Product 34 - AA Battery Holder 4x (Power)
            new { ProductsId = 34, CategoriesId = 6 },
            // Product 35 - 9V Battery Snap (Power, Connectors)
            new { ProductsId = 35, CategoriesId = 6 },
            new { ProductsId = 35, CategoriesId = 7 },
            // Product 36 - Male Pin Headers 40-pin (Connectors)
            new { ProductsId = 36, CategoriesId = 7 },
            // Product 37 - Female Pin Headers 40-pin (Connectors)
            new { ProductsId = 37, CategoriesId = 7 },
            // Product 38 - USB-A to USB-B Cable (Connectors)
            new { ProductsId = 38, CategoriesId = 7 },
            // Product 39 - Micro USB Cable (Connectors)
            new { ProductsId = 39, CategoriesId = 7 },
            // Product 40 - Screw Terminal 2-pin (Connectors)
            new { ProductsId = 40, CategoriesId = 7 },
            // Product 41 - Screw Terminal 3-pin (Connectors)
            new { ProductsId = 41, CategoriesId = 7 },
            // Product 42 - Soil Moisture Sensor (Sensors)
            new { ProductsId = 42, CategoriesId = 8 },
            // Product 43 - Sound Sensor Module (Sensors)
            new { ProductsId = 43, CategoriesId = 8 },
            // Product 44 - Flame Sensor Module (Sensors)
            new { ProductsId = 44, CategoriesId = 8 },
            // Product 45 - Gas Sensor MQ-2 (Sensors)
            new { ProductsId = 45, CategoriesId = 8 },
            // Product 46 - Gyroscope MPU-6050 (Sensors)
            new { ProductsId = 46, CategoriesId = 8 },
            // Product 47 - Barometric Pressure Sensor BMP280 (Sensors)
            new { ProductsId = 47, CategoriesId = 8 },
            // Product 48 - TFT LCD 1.8" (Displays)
            new { ProductsId = 48, CategoriesId = 9 },
            // Product 49 - E-Paper Display 2.9" (Displays)
            new { ProductsId = 49, CategoriesId = 9 },
            // Product 50 - LED Matrix 8x8 (Displays, Semiconductors)
            new { ProductsId = 50, CategoriesId = 9 },
            new { ProductsId = 50, CategoriesId = 4 })
        );

        modelBuilder.Entity<User>().HasData(
            new User
            {
                Id = 1,
                Email = "admin.one@cgitest.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"),
                IsAdmin = true
            },
            new User
            {
                Id = 2,
                Email = "not.admin@cgitest.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("notAdmin123"),
                IsAdmin = false
            }
        );
    }
}