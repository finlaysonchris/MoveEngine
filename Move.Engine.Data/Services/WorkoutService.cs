namespace Move.Engine.Data.Services;
[Coalesce, Service]
public class WorkoutService
{
    [Coalesce]
    public string GenerateWorkout(string workingRequest)
    {
        return "the generated workout";
    }
}
