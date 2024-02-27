"use client";

import { Category, Ingredient } from "@prisma/client";
import { X } from "lucide-react";

import { deleteCategory } from "@/actions/delete-category";
import { deleteIngredient } from "@/actions/delete-ingredient";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UseTabsStore } from "@/store/tabs-store";

import { Badge } from "../ui/badge";
import { CreateCategoryForm } from "./create-category-form";
import { CreateIngredientForm } from "./create-ingredient-form";

interface CreateProductProps {
  ingredients: Ingredient[];
  categories: Category[];
}

export function CreateProduct({ ingredients, categories }: CreateProductProps) {
  const {
    activeTab,
    setCategoryTab,
    productTab,
    setIngredintTab,
    categoryTab,
    ingredintTab,
    setProductTab,
  } = UseTabsStore();

  return (
    <div className="flex h-full w-full space-x-4">
      <Tabs defaultValue={activeTab} className="flex h-full w-1/2 flex-col">
        <TabsList className="w-full space-x-6">
          <TabsTrigger
            value={"product"}
            onClick={() => {
              setProductTab("product");
            }}
          >
            Product
          </TabsTrigger>
          <TabsTrigger
            value="category"
            onClick={() => {
              setCategoryTab("category");
            }}
          >
            Category
          </TabsTrigger>
          <TabsTrigger
            value="ingredients"
            onClick={() => {
              setIngredintTab("ingredients");
            }}
          >
            Ingredients
          </TabsTrigger>
        </TabsList>
        <TabsContent value={productTab}>
          <div className="h-full w-full bg-blue-400 p-4">{productTab}</div>
        </TabsContent>
        <TabsContent value={categoryTab}>
          {" "}
          <CreateCategoryForm />
          <div className="mt-4 flex flex-wrap justify-center gap-2 px-2">
            {categories.map((category) => (
              <Badge
                className="flex items-center hover:bg-slate-400/50"
                key={category.id}
                variant="outline"
              >
                {category.name}
                <X
                  onClick={() =>
                    deleteCategory(category.id).then(() => {
                      console.log("Category deleted");
                    })
                  }
                  className="ml-1 h-3 w-3 cursor-pointer font-semibold hover:text-red-500"
                />
              </Badge>
            ))}
          </div>
        </TabsContent>
        <TabsContent value={ingredintTab}>
          <CreateIngredientForm />
          <div className="mt-4 flex flex-wrap justify-center gap-2 px-2">
            {ingredients.map((ingredient) => (
              <Badge
                className="flex items-center hover:bg-slate-400/50"
                key={ingredient.id}
                variant="outline"
              >
                {ingredient.name}
                <X
                  onClick={() =>
                    deleteIngredient(ingredient.id).then(() => {
                      console.log("Ingredient deleted");
                    })
                  }
                  className="ml-1 h-3 w-3 cursor-pointer font-semibold hover:text-red-500"
                />
              </Badge>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      <div className="w-1/2 flex-1 rounded-md border p-4">Products</div>
    </div>
  );
}
