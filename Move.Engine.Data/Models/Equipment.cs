using System.ComponentModel;

namespace Move.Engine.Data.Models;


[Description("A sample model provided by the Coalesce template. Remove this when you start building your real data model.")]
public class Equipment
    : TrackingBase
{
    public int EquipmentId { get; set; }

    public required string Name { get; set; }

    public required string Icon { get; set; }
}
