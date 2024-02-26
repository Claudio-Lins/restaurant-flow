import { currentUser } from "@/lib/auth";

// import { ExtendedUser } from "../../../../next-auth";
import { Separator } from "../ui/separator";
import { AdminSvg } from "./admin";
import { Navigation } from "./navigation";

export async function Sidebar() {
  const user = await currentUser();
  // const extendedUser = user as ExtendedUser | undefined;
  return (
    <aside className="space-y-6 border-r border-muted-foreground px-5 py-8">
      <div className="flex items-center gap-2">
        <AdminSvg />
        <h3 className="mb-0 inline-block text-muted">{user?.name}</h3>
      </div>
      <Separator />
      <Navigation />
    </aside>
  );
}
