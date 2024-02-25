"use server";

import { revalidatePath } from "next/cache";
import * as z from "zod";

import prisma from "@/lib/prisma";

import { RestaurantImageSchema } from "../../schemas";

export const updateImageRestaurant = async (
  values: z.infer<typeof RestaurantImageSchema>,
) => {
  console.log("Dados recebidos:", values);

  const validatedFields = RestaurantImageSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  validatedFields.data;

  await prisma.restaurant.update({
    where: { id: values.id },
    data: { image: values.image },
  });

  console.log("Atualização bem-sucedida");
  revalidatePath("/admin/restaurant");

  return { success: "Restaurant image updated" };
};
