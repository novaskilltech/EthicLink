import { getProfile } from "@/app/actions/profile";
import { ProfileForm } from "@/components/dashboard/profile/ProfileForm";

export default async function ProfilePage() {
  const profile = await getProfile();

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-10 p-10 max-w-2xl mx-auto">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight">Public Profile</h1>
        <p className="text-muted-foreground mt-2 text-lg">Manage your identity and how you appear to others.</p>
      </header>

      <ProfileForm initialData={profile} />
    </div>
  );
}
