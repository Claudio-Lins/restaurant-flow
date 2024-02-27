"use server";

import { revalidatePath } from "next/cache";
import * as z from "zod";

import prisma from "@/lib/prisma";

import { CategorySchema } from "../../schemas";

export const createCategory = async (
  values: z.infer<typeof CategorySchema>,
) => {
  const validatedFields = CategorySchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  const { name, description, imageUrl } = validatedFields.data;

  await prisma.category.create({
    data: {
      name,
      description,
      imageUrl,
    },
  });
  revalidatePath("/admin/product");

  return { success: "Ingredient created" };
};
