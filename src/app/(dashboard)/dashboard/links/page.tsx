import { getLinks } from "@/app/actions/links";
import { LinkList } from "@/components/dashboard/links/LinkList";
import { LinkForm } from "@/components/dashboard/links/LinkForm";

export default async function LinksPage() {
  const links = await getLinks();

  return (
    <div className="flex flex-col gap-12 p-8 lg:p-12">
      <header className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-on-surface">Your Links</h1>
          <p className="text-on-surface-variant text-lg">Add, edit and organize your global presence.</p>
        </div>
        <LinkForm />
      </header>

      <div className="flex flex-col gap-8">
        <LinkList initialLinks={links} />
      </div>
    </div>
  );
}
