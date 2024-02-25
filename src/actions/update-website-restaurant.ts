"use server";

import { revalidatePath } from "next/cache";
import * as z from "zod";

import prisma from "@/lib/prisma";

import { RestaurantWebsiteSchema } from "../../schemas";

export const updateWebsiteRestaurant = async (
  values: z.infer<typeof RestaurantWebsiteSchema>,
) => {
  console.log("Dados recebidos:", values);

  const validatedFields = RestaurantWebsiteSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  validatedFields.data;

  await prisma.restaurant.update({
    where: { id: values.id },
    data: { website: values.website },
  });

  console.log("Atualização bem-sucedida");
  revalidatePath("/admin/restaurant");

  return { success: "Restaurant website updated" };
};
