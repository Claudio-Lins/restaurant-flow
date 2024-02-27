"use client";

import { Category, Ingredient, Product } from "@prisma/client";
import { X } from "lucide-react";
import Image from "next/image";

import { deleteCategory } from "@/actions/delete-category";
import { deleteIngredient } from "@/actions/delete-ingredient";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UseTabsStore } from "@/store/tabs-store";

import { Badge } from "../ui/badge";
import { CreateCategoryForm } from "./create-category-form";
import { CreateIngredientForm } from "./create-ingredient-form";
import { CreateProductForm } from "./create-product-form";

interface CreateProductProps {
  ingredients: Ingredient[];
  categories: Category[];
  products: Product[];
}

export function CreateProduct({
  ingredients,
  categories,
  products,
}: CreateProductProps) {
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
          <CreateProductForm
            ingredients={ingredients || []}
            categories={categories || []}
          />
        </TabsContent>
        <TabsContent value={categoryTab}>
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
      <div className="w-1/2 flex-1 rounded-md border p-4">
        {!products ? (
          <div className="flex h-32 w-32 items-end justify-center rounded-md border border-dashed">
            Empty
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {products.map((product: any) => (
              <Dialog key={product.id}>
                <DialogTrigger className="">
                  <div>
                    <Image
                      src={product.imageUrl || ""}
                      alt={product.name}
                      width={64}
                      height={64}
                      className="h-16 w-16 cursor-pointer rounded-md transition-all duration-300 ease-in-out hover:scale-110"
                    />
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        )}
      </div>
      {/* <div className="w-1/2 flex-1 rounded-md border p-4">
        {products.map((product: any) => (
          <div key={product.id} className="flex items-center gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm">{product.description}</p>
              <p className="text-sm">{product.price}</p>
            </div>
            <div className="flex w-full flex-wrap justify-center gap-1">
              {product.ingredients.map((ingredient: Ingredient) => (
                <Badge key={ingredient.id} variant="outline">
                  {ingredient.name}
                </Badge>
              ))}
            </div>
            <div>
              <Image
                src={product.imageUrl || ""}
                alt={product.name}
                width={64}
                height={64}
                className="h-16 w-16 rounded-md"
              />
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}
