import { currentUser } from "@/lib/auth";

import { ExtendedUser } from "../../../next-auth";
import { Separator } from "../ui/separator";
import { AdminSvg } from "./admin";
import { Navigation } from "./navigation";
import { SignOutButton } from "./sign-out-button";

export async function Sidebar() {
  const user = await currentUser();
  const extendedUser = user as ExtendedUser | undefined;
  return (
    <aside className="flex flex-col justify-between border-r border-muted-foreground px-5 py-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <AdminSvg />
          <h3 className="mb-0 inline-block text-muted">{user?.name}</h3>
        </div>
        <Separator />
        <Navigation />
      </div>
      <div className="flex flex-col gap-2">
        <SignOutButton />
      </div>
    </aside>
  );
}
