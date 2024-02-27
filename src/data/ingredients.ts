import prisma from "@/lib/prisma";

export async function getIngredients() {
  try {
    const ingredients = await prisma.ingredient.findMany();
    return ingredients;
  } catch (error) {
    console.log(error);
  }
}
