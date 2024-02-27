"use server";

import { revalidatePath } from "next/cache";
import * as z from "zod";

import prisma from "@/lib/prisma";

import { ProductSchema } from "../../schemas";

export const createProduct = async (values: z.infer<typeof ProductSchema>) => {
  const validatedFields = ProductSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  const { name, description, imageUrl, price, categoryId } = values;

  const categoryExists = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!categoryExists) {
    return { error: "Category does not exist!" };
  }
  await prisma.product.create({
    data: {
      name,
      description,
      imageUrl,
      price,
      category: {
        connect: {
          id: categoryId,
        },
      },
      ingredients: {
        connect: values.ingredients.map((id) => ({ id })),
      },
    },
  });
  revalidatePath("/admin/product");

  return { success: "Product created" };
};
