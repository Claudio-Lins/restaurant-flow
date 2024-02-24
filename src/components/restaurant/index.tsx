import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRestaurant } from "@/data/restaurant";

import { CreateRestaurantForm } from "./create-restaurant-form";
import UpdateButton from "./update-button";
import { UpdateDescriptionForm } from "./update-forms/update-description-form";
import { UpdateNameForm } from "./update-forms/update-name-form";

export async function Restaurant() {
  const restaurant = await getRestaurant();

  if (restaurant?.id === undefined) {
    return <CreateRestaurantForm />;
  } else {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Restaurant Profile</CardTitle>
        </CardHeader>
        <CardContent className="w-[800px] max-w-none divide-y">
          <div className="flex w-full items-center justify-between py-2">
            <strong className="w-40 ">Name</strong>
            <span className="flex-1 text-sm">{restaurant.name}</span>
            <div className="flex w-24 justify-end">
              <UpdateNameForm restaurant={restaurant} />
            </div>
          </div>
          <div className="flex w-full items-center justify-between py-2">
            <strong className="w-40 ">Description</strong>
            <span className="flex-1 text-sm">{restaurant.description}</span>
            <div className="flex w-24 justify-end">
              <UpdateDescriptionForm restaurant={restaurant} />
            </div>
          </div>
          <div className="flex w-full items-center justify-between py-2">
            <strong className="w-40 ">Address</strong>
            <span className="flex-1 text-sm">{restaurant.address}</span>
            <div className="flex w-24 justify-end">
              <UpdateButton />
            </div>
          </div>
          <div className="flex w-full items-center justify-between py-2">
            <strong className="w-40 ">E-mail</strong>
            <span className="flex-1 text-sm">{restaurant.email}</span>
            <div className="flex w-24 justify-end">
              <UpdateButton />
            </div>
          </div>
          <div className="flex w-full items-center justify-between py-2">
            <strong className="w-40 ">Phone</strong>
            <span className="flex-1 text-sm">{restaurant.phone}</span>
            <div className="flex w-24 justify-end">
              <UpdateButton />
            </div>
          </div>
          <div className="flex w-full items-center justify-between py-2">
            <strong className="w-40 ">Website</strong>
            <span className="flex-1 text-sm">{restaurant.website}</span>
            <div className="flex w-24 justify-end">
              <UpdateButton />
            </div>
          </div>
          <div className="flex w-full items-center justify-between py-2">
            <strong className="w-40">Logo</strong>
            <Image
              className="mr-2 rounded-md"
              src={restaurant.image || "/assets/store.svg"}
              width={40}
              height={0}
              alt=""
            />
            <span className="flex-1 truncate text-sm">{restaurant.image}</span>
            <div className="flex w-24 justify-end">
              <UpdateButton />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}
