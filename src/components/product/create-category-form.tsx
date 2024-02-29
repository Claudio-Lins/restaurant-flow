/* eslint-disable simple-import-sort/imports */
"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadCloud, X } from "lucide-react";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseTabsStore } from "@/store/tabs-store";

import { createCategory } from "@/actions/create-category";
import { deleteCategory } from "@/actions/delete-category";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { CategorySchema } from "../../../schemas";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
interface CreateProductFormProps {
  categories: Category[];
}

export function CreateCategoryForm({ categories }: CreateProductFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [imageId, setImageId] = useState("");
  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
    },
  });

  const { setActiveTab } = UseTabsStore();

  async function onSubmit(values: z.infer<typeof CategorySchema>) {
    setError("");
    setSuccess("");
    startTransition(() => {
      startTransition(() => {
        createCategory(values).then((data) => {
          setError(data.error);
          setSuccess(data.success);
          form.reset();
          setActiveTab("product");
          router.push("/admin/product");
          window.location.reload();
        });
      });
    });
  }
  return (
    <div className="flex w-full flex-col">
      <Card className="flex h-[510px] max-w-none flex-col justify-between">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-1 flex-col justify-between"
          >
            <CardContent className="w-full">
              <div className="mt-4 flex flex-col justify-between gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="john.doe"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descriptions</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Description"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col">
                  <FormLabel className="">Image</FormLabel>
                  <div className="mt-2 flex w-full flex-1 items-center justify-center gap-4 rounded-md border border-dashed p-4">
                    <CldUploadWidget
                      onUpload={(result: CldUploadWidgetResults) => {
                        if (
                          result.event === "success" &&
                          typeof result.info !== "string"
                        ) {
                          setImageId(result?.info?.public_id || "");
                          form.setValue(
                            "imageUrl",
                            result?.info?.secure_url || "",
                          );
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
                        width="60"
                        height="60"
                        src={imageId}
                        sizes="100vw"
                        alt={form.watch("name") || "Ingredients Image"}
                        className="rounded-md"
                      />
                    )}
                  </div>
                </div>

                <ScrollArea className="h-[120px] w-full rounded-md border bg-zinc-50/50 p-4">
                  <div className="flex flex-wrap justify-center gap-2">
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
                </ScrollArea>
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
        </Form>
      </Card>
    </div>
  );
}
