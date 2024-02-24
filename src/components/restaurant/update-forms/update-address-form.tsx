"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { updateAddressRestaurant } from "@/actions/update-address-restaurant";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { RestaurantAddressSchema } from "../../../../schemas";

interface UpdateAddressFormProps {
  restaurant: {
    id: string;
    address: string | null;
  };
}

export function UpdateAddressForm({ restaurant }: UpdateAddressFormProps) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof RestaurantAddressSchema>>({
    resolver: zodResolver(RestaurantAddressSchema),
    defaultValues: {
      id: restaurant.id,
      address: restaurant.address || "",
    },
  });

  const onSubmit = (values: z.infer<typeof RestaurantAddressSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      startTransition(() => {
        updateAddressRestaurant(values).then((data) => {
          setError(data.error);
          setIsDialogOpen(false);
        });
        router.refresh();
      });
    });
  };

  return (
    <div>
      <Dialog open={isDialogOpen}>
        <DialogTrigger asChild onClick={() => setIsDialogOpen(true)}>
          <Button variant="link">Editar</Button>
        </DialogTrigger>
        <DialogContent className="">
          <DialogTitle>Update Restaurant name</DialogTitle>
          <Separator />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full items-end gap-2"
            >
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button disabled={isPending} type="submit">
                Update
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
