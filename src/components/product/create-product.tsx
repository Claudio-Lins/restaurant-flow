"use client";

import { Category, Ingredient, Product } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { UseTabsStore } from "@/store/tabs-store";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
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
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
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
      <Tabs defaultValue={activeTab} className="flex w-1/2 flex-col">
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
        <TabsContent value={productTab} className="flex-1">
          <CreateProductForm
            ingredients={ingredients || []}
            categories={categories || []}
          />
        </TabsContent>
        <TabsContent value={categoryTab}>
          <CreateCategoryForm categories={categories || []} />
        </TabsContent>
        <TabsContent value={ingredintTab}>
          <CreateIngredientForm ingredients={ingredients || []} />
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
                    <DialogTitle>{product.name}</DialogTitle>
                    <DialogDescription>{product.description}</DialogDescription>
                  </DialogHeader>
                  <div className="w-full">
                    <div
                      onMouseEnter={() => setIsDetailsOpen(true)}
                      onMouseLeave={() => setIsDetailsOpen(false)}
                      className="relative h-[360px] w-full cursor-pointer overflow-hidden"
                    >
                      <Image
                        src={product.imageUrl || ""}
                        alt={product.name}
                        width={640}
                        height={460}
                        className=" bg-position-center w-full rounded-md bg-cover"
                      />
                      <div
                        className={cn(
                          "transation-all absolute inset-0 flex h-full w-full flex-col space-y-2 bg-black bg-opacity-75 p-4 text-white duration-300 ease-in-out",
                          isDetailsOpen ? "top-40" : "top-96",
                        )}
                      >
                        <div className="ml-auto text-2xl font-bold">
                          {(product.price / 100).toLocaleString("pt-PT", {
                            style: "currency",
                            currency: "EUR",
                          })}
                        </div>
                        <div className="">
                          <p className="text-lg font-bold">Category:</p>
                          <Badge
                            variant="outline"
                            className=" text-white hover:bg-slate-400/50"
                          >
                            {product.category?.name || ""}
                          </Badge>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="text-lg font-bold">
                            Ingredients:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {product.ingredients.map((ingredient: any) => (
                              <Badge
                                className="flex items-center text-white hover:bg-slate-400/50"
                                key={ingredient.id}
                                variant="outline"
                              >
                                {ingredient.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <div className="flex w-full items-center justify-between gap-4">
                      <Button className="w-full">Update</Button>
                      <Button className="w-full" variant="destructive">
                        Delete
                      </Button>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
