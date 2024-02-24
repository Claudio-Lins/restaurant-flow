"use server";

import { revalidatePath } from "next/cache";
import * as z from "zod";

import prisma from "@/lib/prisma";

import { RestaurantAddressSchema } from "../../schemas";

export const updateAddressRestaurant = async (
  values: z.infer<typeof RestaurantAddressSchema>,
) => {
  console.log("Dados recebidos:", values);

  const validatedFields = RestaurantAddressSchema.safeParse(values);

  if (!validatedFields.success) {
    console.log("Validação falhou:", validatedFields.error);

    return { error: "Invalid fields" };
  }
  validatedFields.data;

  await prisma.restaurant.update({
    where: { id: values.id },
    data: { address: values.address },
  });

  console.log("Atualização bem-sucedida");
  revalidatePath("/admin/restaurant");

  return { success: "Restaurant address updated" };
};
