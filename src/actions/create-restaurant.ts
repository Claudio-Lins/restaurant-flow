"use server";

import { revalidatePath } from "next/cache";
import * as z from "zod";

import prisma from "@/lib/prisma";

import { RestaurantSchema } from "../../schemas";

export const createRestaurant = async (
  values: z.infer<typeof RestaurantSchema>,
) => {
  console.log(values);
  const validatedFields = RestaurantSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  const { name, address, email, description, image, phone, website } =
    validatedFields.data;

  await prisma.restaurant.create({
    data: {
      name,
      address,
      email,
      description,
      image,
      phone,
      website,
    },
  });
  revalidatePath("/admin/restaurant");

  return { success: "Restaurant created" };
};
