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

import { createRestaurant } from "@/actions/create-restaurant";
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

import { RestaurantSchema } from "../../../schemas";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

export function CreateRestaurantForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [imageId, setImageId] = useState("");
  const form = useForm<z.infer<typeof RestaurantSchema>>({
    resolver: zodResolver(RestaurantSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      phone: "",
      description: "",
      website: "",
      image: "",
    },
  });

  async function onSubmit(values: z.infer<typeof RestaurantSchema>) {
    console.log(values);
    setError("");
    setSuccess("");
    startTransition(() => {
      startTransition(() => {
        createRestaurant(values).then((data) => {
          setError(data.error);
          setSuccess(data.success);
        });
      });
    });
  }

  return (
    <div className="w-[800px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-8 flex w-full gap-4">
            <div className="w-1/2 space-y-4">
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="john.doe@example.com"
                        type="email"
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="1234 Main St"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="123-456-7890"
                        type="tel"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-1/2 flex-col space-y-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={isPending}
                        placeholder="A restaurant"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="https://example.com"
                        type="url"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-1 flex-col">
                <FormLabel className="">Image</FormLabel>
                <div className="mt-2 flex w-full flex-1 items-center justify-center gap-4 rounded-md border border-dashed p-2">
                  <CldUploadWidget
                    onUpload={(result: CldUploadWidgetResults) => {
                      if (
                        result.event === "success" &&
                        typeof result.info !== "string"
                      ) {
                        setImageId(result?.info?.public_id || "");
                        form.setValue("image", result?.info?.secure_url || "");
                      }
                    }}
                    uploadPreset="restaurant-flow"
                  >
                    {({ open }) => {
                      return (
                        <Button
                          variant="link"
                          onClick={() => open()}
                          className=" text-white"
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
                      alt={form.watch("name") || "Restaurant Image"}
                      className="rounded-md"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            Create Restaurant
          </Button>
        </form>
      </Form>
    </div>
  );
}
