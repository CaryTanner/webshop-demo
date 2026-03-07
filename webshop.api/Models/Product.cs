using System.ComponentModel.DataAnnotations;
public class Product
{
    public int Id { get; set; }
    [MaxLength(250)]
    public required string Name { get; set; }

    [MaxLength(500)]
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public int Stock { get; set; }
    public required SvgType SvgType { get; set; }
    public List<Category> Categories { get; set; } = new();
    public List<OrderItem> OrderItems { get; set; } = new();
}

public enum SvgType
{
    Resistor,
    Capacitor,
    Inductor,
    Led,
    Transistor,
    IcChip,
    Microcontroller,
    Connector,
    Battery,
    Sensor,
    Display,
    Semiconductor,
}