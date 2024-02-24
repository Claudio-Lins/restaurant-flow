"use server";

import { revalidatePath } from "next/cache";
import * as z from "zod";

import prisma from "@/lib/prisma";

import { RestaurantEmailSchema } from "../../schemas";

export const updateEmailRestaurant = async (
  values: z.infer<typeof RestaurantEmailSchema>,
) => {
  console.log("Dados recebidos:", values);

  const validatedFields = RestaurantEmailSchema.safeParse(values);

  if (!validatedFields.success) {
    console.log("Validação falhou:", validatedFields.error);

    return { error: "Invalid fields" };
  }
  validatedFields.data;

  await prisma.restaurant.update({
    where: { id: values.id },
    data: { email: values.email },
  });

  console.log("Atualização bem-sucedida");
  revalidatePath("/admin/restaurant");

  return { success: "Restaurant email updated" };
};
