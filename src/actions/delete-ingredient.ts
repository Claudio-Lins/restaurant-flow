"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";

export const deleteIngredient = async (id: string) => {
  await prisma.ingredient.delete({
    where: { id },
  });

  console.log("Atualização bem-sucedida");
  revalidatePath("/admin/product");

  return { success: "Ingredient deleted" };
};
