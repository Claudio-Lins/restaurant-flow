import { Store } from "lucide-react";

import { Restaurant } from "@/components/restaurant";
import { Separator } from "@/components/ui/separator";

export default function RestaurantPage() {
  return (
    <div className=" w-full space-y-4">
      <div className="flex items-center gap-2">
        <Store strokeWidth={1} size={32} className="text-muted" />
        <h1 className="mb-0 inline-block text-muted">Restaurants</h1>
      </div>
      <Separator />
      <div className="flex h-[calc(80vh)] w-full items-center justify-center rounded-lg bg-slate-100/50 p-8">
        <Restaurant />
      </div>
    </div>
  );
}
