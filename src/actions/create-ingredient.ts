"use server";

import { revalidatePath } from "next/cache";
import * as z from "zod";

import prisma from "@/lib/prisma";

import { IngredientSchema } from "../../schemas";

export const createIngredient = async (
  values: z.infer<typeof IngredientSchema>,
) => {
  const validatedFields = IngredientSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  const { name, imageUrl } = validatedFields.data;

  await prisma.ingredient.create({
    data: {
      name,
      imageUrl,
    },
  });
  revalidatePath("/admin/product");

  return { success: "Ingredient created" };
};
