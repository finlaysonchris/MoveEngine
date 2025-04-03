namespace Move.Engine.Data.Models;
public class UserWorkout : TrackingBase
{
    public int UserWorkoutId { get; set; }
    public required string UserId { get; set; }
    public User? User { get; set; }
    public required string Name { get; set; }
    public required string Workout { get; set; }

    [Coalesce]
    public static void SaveWorkout([Inject] AppDbContext context, ClaimsPrincipal user, string name, string workout)
    {
        var userId = user.GetUserId();
        UserWorkout uw = new UserWorkout() { Name = name, Workout = workout, UserId = userId };
        context.UserWorkouts.Add(uw);
        context.SaveChanges();
    }
}
