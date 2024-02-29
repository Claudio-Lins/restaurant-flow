/* eslint-disable simple-import-sort/imports */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UploadCloud } from "lucide-react";
import {
  CldImage,
  CldUploadWidget,
  CldUploadWidgetResults,
} from "next-cloudinary";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Input } from "@/components/ui/input";

import { createProduct } from "@/actions/create-product";
import { Category, Ingredient } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ProductSchema } from "../../../schemas";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";

interface CreateProductFormProps {
  categories: Category[];
  ingredients: Ingredient[];
}

export function CreateProductForm({
  categories,
  ingredients,
}: CreateProductFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [imageId, setImageId] = useState("");
  const { register, handleSubmit, reset, setValue } = useForm<
    z.infer<typeof ProductSchema>
  >({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
      price: 0,
      categoryId: categories?.[0]?.id,
    },
  });

  async function onSubmit(values: z.infer<typeof ProductSchema>) {
    setError("");
    setSuccess("");
    startTransition(() => {
      startTransition(() => {
        const price = parseFloat(values.price.toString().replace(",", "."));
        const updatedValues = { ...values, price };
        createProduct(updatedValues).then((data) => {
          setError(data.error);
          setSuccess(data.success);
          setImageId("");
          reset();
          router.refresh();
        });
      });
    });
  }
  return (
    <div className="flex w-full flex-col space-y-6">
      <Card className="flex h-[510px] max-w-none flex-col justify-between">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-1 flex-col justify-between"
        >
          <CardContent className="w-full">
            <div className="mt-4 space-y-4">
              <div className="flex w-full items-center gap-2">
                <div className="flex w-full flex-col gap-2">
                  <Label className="mb-2">Product name</Label>
                  <Input
                    className="w-full flex-1"
                    disabled={isPending}
                    placeholder="Pizza de Calabresa"
                    type="text"
                    {...register("name")}
                  />
                </div>
                <div className="flex w-full flex-col gap-2">
                  <Label className="mb-2">Price</Label>
                  <Input
                    {...register("price", {
                      valueAsNumber: true,
                      required: "Price is required",
                    })}
                    disabled={isPending}
                    placeholder="€ 10.00"
                    type="number"
                  />
                </div>
              </div>
              <div className="flex w-full flex-col gap-2">
                <Label className="mb-2">Description</Label>
                <Input
                  {...register("description")}
                  disabled={isPending}
                  placeholder="Pizza de Calabresa com cebola e azeitona."
                  type="text"
                />
              </div>
              <div className="flex w-full justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex-1 flex-col space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                      {...register("categoryId")}
                    >
                      {categories?.map((category: Category) => {
                        return (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <Label className="mt-2">Ingredients</Label>
                  <ScrollArea className="h-[130px] w-full rounded-md border bg-zinc-50/50 px-4 pb-2">
                    <div className="mt-2 flex flex-col gap-2">
                      <div className="flex flex-wrap gap-2">
                        {ingredients.map((ingredient) => (
                          <div
                            key={ingredient.id}
                            className="flex items-center gap-1 text-xs "
                          >
                            <input
                              className="h-3 w-3 rounded-md"
                              type="checkbox"
                              id={ingredient.name}
                              value={ingredient.id}
                              {...register("ingredients")}
                            />
                            <label htmlFor={ingredient.name}>
                              {ingredient.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollArea>
                </div>

                <div className="flex flex-col">
                  <Label className="">Image</Label>
                  <div className="mt-2 flex w-full flex-1 flex-col items-center justify-center gap-4 rounded-md border border-dashed">
                    <CldUploadWidget
                      options={{
                        sources: [
                          "local",
                          "url",
                          "image_search",
                          "camera",
                          "unsplash",
                          "google_drive",
                        ],
                      }}
                      onUpload={(result: CldUploadWidgetResults) => {
                        if (
                          result.event === "success" &&
                          typeof result.info !== "string"
                        ) {
                          setImageId(result?.info?.public_id || "");
                          setValue("imageUrl", result?.info?.secure_url || "");
                        }
                      }}
                      uploadPreset="restaurant-flow"
                    >
                      {({ open }) => {
                        return (
                          <Button
                            variant="link"
                            onClick={() => open()}
                            className=" z-50 text-zinc-900"
                          >
                            <div className="flex flex-col items-center ">
                              <UploadCloud size={32} />
                              <p>Upload Image</p>
                            </div>
                          </Button>
                        );
                      }}
                    </CldUploadWidget>
                    {imageId && (
                      <CldImage
                        width="110"
                        height="110"
                        src={imageId}
                        sizes="100vw"
                        alt={"Ingredients Image"}
                        className="rounded-md"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col justify-center space-y-2">
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button disabled={isPending} type="submit" className="w-full">
              Create category
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
