import { CookingPot } from "lucide-react";

import { CreateProduct } from "@/components/product/create-product";
import { Separator } from "@/components/ui/separator";
import { getCategories } from "@/data/categories";
import { getIngredients } from "@/data/ingredients";

export default async function ProductPage() {
  const ingredients = await getIngredients();
  const categories = await getCategories();
  return (
    <div className=" w-full space-y-4">
      <div className="flex items-center gap-2">
        <CookingPot strokeWidth={1} size={32} className="text-muted" />
        <h1 className="mb-0 inline-block text-muted">Products</h1>
      </div>
      <Separator />
      <div className="h-[calc(80vh)] rounded-lg bg-slate-100/50 p-8">
        <CreateProduct
          ingredients={ingredients || []}
          categories={categories || []}
        />
      </div>
    </div>
  );
}
