import { notFound } from "next/navigation";
import { PublicPageRenderer } from "@/components/layouts/PublicPageRenderer";
import { getPublicProfile } from "@/app/actions/profile";

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  console.log("DEBUG: PublicProfilePage slug (Firestore):", slug);
  
  const data = await getPublicProfile(slug);

  if (!data) {
    notFound();
  }

  // Analytics tracking moved to Firestore in Phase 4b
  // For now we just pass the data to the renderer
  return <PublicPageRenderer profile={data} page={data} />;
}
