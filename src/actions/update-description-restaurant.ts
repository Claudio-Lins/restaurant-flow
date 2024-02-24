"use server";

import { revalidatePath } from "next/cache";
import * as z from "zod";

import prisma from "@/lib/prisma";

import { RestaurantDescriptionSchema } from "../../schemas";

export const updateDescriptionRestaurant = async (
  values: z.infer<typeof RestaurantDescriptionSchema>,
) => {
  console.log("Dados recebidos:", values);

  const validatedFields = RestaurantDescriptionSchema.safeParse(values);

  if (!validatedFields.success) {
    console.log("Validação falhou:", validatedFields.error);

    return { error: "Invalid fields" };
  }
  validatedFields.data;

  await prisma.restaurant.update({
    where: { id: values.id },
    data: { description: values.description },
  });

  console.log("Atualização bem-sucedida");
  revalidatePath("/admin/restaurant");

  return { success: "Restaurant description updated" };
};
