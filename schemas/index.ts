import { UserRole } from "@prisma/client";
import * as z from "zod";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([
      UserRole.ADMIN,
      UserRole.USER,
      UserRole.MODERATOR,
      UserRole.SUPER_ADMIN,
    ]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    },
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    },
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const RestaurantSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  image: z.string().url({
    message: "Image is required",
  }),
  address: z.string().min(1, {
    message: "Address is required",
  }),
  phone: z.string().min(1, {
    message: "Phone is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  website: z.string().url({
    message: "Website is required",
  }),
});

export const RestaurantNameSchema = z.object({
  id: z.string(),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const RestaurantDescriptionSchema = z.object({
  id: z.string(),
  description: z.string().min(1, {
    message: "Description is required",
  }),
});

export const RestaurantAddressSchema = z.object({
  id: z.string(),
  address: z.string().min(1, {
    message: "Address is required",
  }),
});

export const RestaurantEmailSchema = z.object({
  id: z.string(),
  email: z.string().email({
    message: "Email is required",
  }),
});

export const RestaurantPhoneSchema = z.object({
  id: z.string(),
  phone: z.string().min(1, {
    message: "Phone is required",
  }),
});

export const RestaurantWebsiteSchema = z.object({
  id: z.string(),
  website: z.string().url({
    message: "Website is required",
  }),
});

export const RestaurantImageSchema = z.object({
  id: z.string(),
  image: z.string().url({
    message: "Image is required",
  }),
});

export const IngredientSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  imageUrl: z.string().url({
    message: "Image is required",
  }),
});

export const CategorySchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  imageUrl: z.string().url({
    message: "Image is required",
  }),
});

export const ProductSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  imageUrl: z.string().url({
    message: "Image is required",
  }),
  price: z.number().min(1, {
    message: "Price is required",
  }),
  categoryId: z.string().min(1, {
    message: "Category is required",
  }),
  ingredients: z.array(
    z.string().min(1, { message: "Ingredients is required" }),
  ),
});
