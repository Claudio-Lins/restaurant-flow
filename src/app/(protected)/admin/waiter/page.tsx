import { Plus, User } from "lucide-react";

import { Separator } from "@/components/ui/separator";

export default function WaiterPage() {
  return (
    <div className=" w-full space-y-4">
      <div className="flex items-center gap-2">
        <User strokeWidth={1} size={32} className="text-muted" />
        <h1 className="mb-0 inline-block text-muted">Waiters</h1>
      </div>
      <Separator />
      <div className="h-[calc(80vh)] rounded-lg bg-slate-100/50 p-8">
        <div className="flex h-32 w-32 items-center justify-center rounded-lg border shadow-md">
          <Plus size={32} className="text-muted" />
        </div>
      </div>
    </div>
  );
}
