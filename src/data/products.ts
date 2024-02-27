import prisma from "@/lib/prisma";

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        ingredients: true,
      },
    });
    return products;
  } catch (error) {
    console.log(error);
  }
}
