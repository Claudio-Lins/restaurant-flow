"use server";

import { revalidatePath } from "next/cache";
import * as z from "zod";

import prisma from "@/lib/prisma";

import { RestaurantNameSchema } from "../../schemas";

export const updateNameRestaurant = async (
  values: z.infer<typeof RestaurantNameSchema>,
) => {
  console.log("Dados recebidos:", values);

  const validatedFields = RestaurantNameSchema.safeParse(values);

  if (!validatedFields.success) {
    console.log("Validação falhou:", validatedFields.error);

    return { error: "Invalid fields" };
  }
  validatedFields.data;

  await prisma.restaurant.update({
    where: { id: values.id },
    data: { name: values.name },
  });

  console.log("Atualização bem-sucedida");
  revalidatePath("/admin/restaurant");

  return { success: "Restaurant name updated" };
};
