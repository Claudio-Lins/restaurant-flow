"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { updatePhoneRestaurant } from "@/actions/update-phone-restaurant";
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

import { RestaurantPhoneSchema } from "../../../../schemas";

interface UpdatePhoneFormProps {
  restaurant: {
    id: string;
    phone: string | null;
  };
}

export function UpdatePhoneForm({ restaurant }: UpdatePhoneFormProps) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof RestaurantPhoneSchema>>({
    resolver: zodResolver(RestaurantPhoneSchema),
    defaultValues: {
      id: restaurant.id,
      phone: restaurant.phone || "",
    },
  });

  const onSubmit = (values: z.infer<typeof RestaurantPhoneSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      startTransition(() => {
        updatePhoneRestaurant(values).then((data) => {
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
          <DialogTitle>Update phone Restaurant</DialogTitle>
          <Separator />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full items-end gap-2"
            >
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          type="tel"
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
