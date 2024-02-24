"use server";

import { revalidatePath } from "next/cache";
import * as z from "zod";

import prisma from "@/lib/prisma";

import { RestaurantPhoneSchema } from "../../schemas";

export const updatePhoneRestaurant = async (
  values: z.infer<typeof RestaurantPhoneSchema>,
) => {
  console.log("Dados recebidos:", values);

  const validatedFields = RestaurantPhoneSchema.safeParse(values);

  if (!validatedFields.success) {
    console.log("Validação falhou:", validatedFields.error);

    return { error: "Invalid fields" };
  }
  validatedFields.data;

  await prisma.restaurant.update({
    where: { id: values.id },
    data: { phone: values.phone },
  });

  console.log("Atualização bem-sucedida");
  revalidatePath("/admin/restaurant");

  return { success: "Restaurant phone updated" };
};
