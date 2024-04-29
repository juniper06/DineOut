import { getRestaurants } from "@/app/action";
import AddRestaurantButton from "@/components/AddRestaurantButton";
import Pagination from "@/components/Pagination";
import RestaurantCard from "@/components/RestaurantCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export type SearchParams = {
  searchParams?: RestaurantQuery;
};

export default async function Discover({ searchParams }: SearchParams) {
  const response: ApiResponse = await getRestaurants(searchParams || {});
  const restaurants = response.content;
  return (
    <div className="h-screen pt-[140px] .scroll">
      <div className="container flex justify-center">
        
        <div className="py-14 h-3/4 w-full">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold mb-3">
              Restaurants
              <span className="text-sm text-gray-500">
                ( {response.numberOfElements} )
              </span>
            </h1>
            <AddRestaurantButton />
          </div>

          <div className="grid grid-cols-4 gap-5 mb-10">
            {restaurants.map((restaurant) => (
              <Link href="#" key={restaurant.id}>
                <RestaurantCard
                  image={restaurant.images[0]}
                  name={restaurant.name}
                  location={restaurant.address}
                  ratings={restaurant.ratings !== 0 ? restaurant.ratings : 5}
                />
              </Link>
            ))}
          </div>
          <Pagination
            totalPages={response.totalPages}
            page={Number(searchParams?.page) || 1}
          />
        </div>
      </div>
    </div>
  );
}
