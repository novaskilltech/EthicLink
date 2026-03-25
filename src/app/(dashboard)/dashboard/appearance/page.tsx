import { getAppearance } from "@/app/actions/appearance";
import { LayoutSelector } from "@/components/dashboard/appearance/LayoutSelector";

export default async function AppearancePage() {
  const currentPreset = await getAppearance();

  return (
    <div className="flex flex-col gap-10 p-10 max-w-4xl mx-auto">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight">Appearance</h1>
        <p className="text-muted-foreground mt-2 text-lg">Customize how the world sees your digital identity.</p>
      </header>

      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold">Layout Presets</h2>
        <LayoutSelector initialPreset={currentPreset} />
      </section>
    </div>
  );
}
