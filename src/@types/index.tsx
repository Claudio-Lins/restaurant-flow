import { Category, Ingredient } from "@prisma/client";

export interface ProductTypes {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  price: number;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
  ingredients: Ingredient[]; // Assuming Ingredient is the correct type for ingredients
  category: Category; // Assuming Category is the correct type for category
}
