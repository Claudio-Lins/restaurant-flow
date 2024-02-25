/* eslint-disable simple-import-sort/imports */
"use client";

import { updateImageRestaurant } from "@/actions/update-image-restaurant";
import { CldUploadWidget } from "next-cloudinary";
// import { zodResolver } from "@hookform/resolvers/zod";
import { CldUploadWidgetInfo, CldUploadWidgetResults } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
// import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { RestaurantImageSchema } from "../../../../schemas";

interface UpdateWebsiteFormProps {
  restaurant: {
    id: string;
    image: string | null;
  };
}

export function UpdateImageForm({ restaurant }: UpdateWebsiteFormProps) {
  const router = useRouter();
  // const [imageId, setImageId] = useState("");
  // const [imageUrl, setImageUrl] = useState("");
  // const form = useForm<z.infer<typeof RestaurantImageSchema>>({
  //   resolver: zodResolver(RestaurantImageSchema),
  //   defaultValues: {
  //     id: restaurant.id,
  //     image: restaurant.image || "",
  //   },
  // });

  async function onSubmit(values: z.infer<typeof RestaurantImageSchema>) {
    const result = await updateImageRestaurant(values);
    console.log(result);
  }

  return (
    <CldUploadWidget
      onUpload={(result: CldUploadWidgetResults) => {
        if (result.event === "success" && typeof result.info !== "string") {
          const info = result.info as CldUploadWidgetInfo;
          startTransition(() => {
            startTransition(() => {
              onSubmit({
                id: restaurant.id,
                image: info?.secure_url,
              });
              router.refresh();
            });
          });
        }
      }}
      uploadPreset="restaurant-flow"
    >
      {({ open }) => {
        return (
          <Button variant="link" onClick={() => open()}>
            Editar
          </Button>
        );
      }}
    </CldUploadWidget>
  );
}
