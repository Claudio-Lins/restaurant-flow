"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { updateNameRestaurant } from "@/actions/update-name-restaurant";
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

import { RestaurantNameSchema } from "../../../../schemas";

interface UpdateNameFormProps {
  restaurant: {
    id: string;
    name: string;
  };
}

export function UpdateNameForm({ restaurant }: UpdateNameFormProps) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof RestaurantNameSchema>>({
    resolver: zodResolver(RestaurantNameSchema),
    defaultValues: {
      id: restaurant.id,
      name: restaurant.name,
    },
  });

  const onSubmit = (values: z.infer<typeof RestaurantNameSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      startTransition(() => {
        updateNameRestaurant(values).then((data) => {
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
              <Button
                disabled={isPending}
                type="submit"
                // onClick={() => updateNameRestaurant(
                //   form.getValues()
                // )}
                className=""
              >
                Update
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
