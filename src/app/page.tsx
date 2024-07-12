import { HeaderNavigation } from "@/components/header";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Home() {
  return (
    <main className="min-h-screen h-screen flex flex-col items-center p-4">
      <div className="flex gap-3">
        <HeaderNavigation />
        <ModeToggle />
      </div>
    </main>
  );
}
