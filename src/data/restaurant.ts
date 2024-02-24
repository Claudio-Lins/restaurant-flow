import prisma from "@/lib/prisma";

export async function getRestaurant() {
  try {
    const restaurant = await prisma.restaurant.findMany();
    return restaurant[0] || {};
  } catch (error) {
    console.log(error);
  }
}
