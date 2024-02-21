import { Separator } from "../ui/separator";
import { AdminSvg } from "./admin";
import { Navigation } from "./navigation";

export function Sidebar() {
  return (
    <aside className="space-y-6 border-r border-muted-foreground px-5 py-8">
      <AdminSvg />
      <Separator />
      <Navigation />
    </aside>
  );
}
