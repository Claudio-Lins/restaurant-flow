"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";

export const deleteCategory = async (id: string) => {
  await prisma.category.delete({
    where: {
      id,
    },
  });

  console.log("Atualização bem-sucedida");
  revalidatePath("/admin/product");

  return { success: "Category deleted" };
};
