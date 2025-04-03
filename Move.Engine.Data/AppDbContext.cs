using Microsoft.AspNetCore.DataProtection.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Move.Engine.Data;

[Coalesce]
public class AppDbContext
    : IdentityDbContext<
        User,
        Role,
        string,
        IdentityUserClaim<string>,
        UserRole,
        IdentityUserLogin<string>,
        RoleClaim,
        IdentityUserToken<string>
    >
    , IDataProtectionKeyContext
{
    public bool SuppressAudit { get; set; } = false;

    public AppDbContext() { }

    public AppDbContext(DbContextOptions options) : base(options) { }

    public DbSet<UserPhoto> UserPhotos => Set<UserPhoto>();

    public DbSet<UserWorkout> UserWorkouts => Set<UserWorkout>();

    [InternalUse]
    public DbSet<DataProtectionKey> DataProtectionKeys => Set<DataProtectionKey>();

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder
        .UseStamping<TrackingBase>((entity, user) => entity.SetTracking(user))
        ;
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // Remove cascading deletes.
        foreach (var relationship in builder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
        {
            relationship.DeleteBehavior = DeleteBehavior.Restrict;
        }

        builder.Entity<UserRole>(userRole =>
        {
            userRole.HasKey(ur => new { ur.UserId, ur.RoleId });

            userRole.HasOne(ur => ur.Role)
                .WithMany()
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            userRole.HasOne(ur => ur.User)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
        });

        builder.Entity<Role>(e =>
        {
            e.PrimitiveCollection(e => e.Permissions).ElementType().HasConversion<string>();

            e.HasMany<RoleClaim>()
                .WithOne(rc => rc.Role)
                .HasPrincipalKey(r => r.Id)
                .HasForeignKey(rc => rc.RoleId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
        });

    }

}
