import { notFound } from "next/navigation";
import { PublicPageRenderer } from "@/components/layouts/PublicPageRenderer";
import { getPublicProfile } from "@/app/actions/profile";
import { trackPageView } from "@/lib/analytics";

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

  // Track page view asynchronously (do not block render)
  trackPageView(slug).catch(err => console.error("trackPageView error:", err));

  return <PublicPageRenderer profile={data} page={data} />;
}
