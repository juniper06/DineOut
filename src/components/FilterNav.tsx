import { getCuisines, getRestaurants, getTags, getTypes } from "@/app/action";
import AddRestaurantButton from "@/components/AddRestaurantButton";
import FilterNav from "@/components/FilterNav";
import Footer from "@/components/Footer";
import Pagination from "@/components/Pagination";
import RestaurantCard from "@/components/RestaurantCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export type SearchParams = {
	searchParams?: RestaurantQuery;
};

export default async function Discover({ searchParams }: SearchParams) {
	const response: ApiResponse = await getRestaurants(searchParams || {});
	const restaurants = response.content;
  const types = await getTypes();
  const cuisines = await getCuisines();
  const tags = await getTags();

	return (
		<div className="h-screen pt-[140px] .scroll">
			<div className="container flex justify-center">
				<aside className="h-full top-[140px] w-[250px] max-w-[250px]">
					<FilterNav types={types} cuisines={cuisines} tags={tags} />
				</aside>
				<div className="py-14 h-3/4 w-full">
          <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-3">
						Top Restaurants Near Me{" "}
						<span className="text-sm text-gray-500">
							( {response.numberOfElements} )
						</span>
					</h1>
          <AddRestaurantButton />
          </div>
					
					<div className="grid grid-cols-4 gap-5 mb-10">
						{restaurants.map(restaurant => (
							<Link
								href={`/restaurant/${restaurant.id}`}
								key={restaurant.id}>
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
			<div className="h-[500px]">
				<div className="container flex gap-x-24">
					<div className="flex flex-col gap-y-3">
						<h1 className="text-2xl font-bold">Discover</h1>
						<p className="text-gray-500">Nearby Restaurants</p>
						<p className="text-gray-500">Recommendations</p>
						<p className="text-gray-500">Randomizer</p>
					</div>
					<div className="flex flex-col gap-y-3">
						<h1 className="text-2xl font-bold">Company</h1>
						<p className="text-gray-500">About Us</p>
						<p className="text-gray-500">Contact Us</p>
						<p className="text-gray-500">Terms of use</p>
						<p className="text-gray-500">Privacy</p>
						<p className="text-gray-500">Help Center</p>
					</div>
					<div className="flex flex-col gap-y-3">
						<h1 className="text-2xl font-bold">Business</h1>
						<p className="text-gray-500 flex items-center gap-x-2">
							Promote Business
						</p>
						<p className="text-gray-500 flex items-center gap-x-2">
							DineOut Pro
						</p>
					</div>
					<div className="flex flex-col gap-y-3">
						<h1 className="text-2xl font-bold">Follow</h1>
						<p className="text-gray-500 flex items-center gap-x-2">
							<FaFacebook />
							Facebook
						</p>
						<p className="text-gray-500 flex items-center gap-x-2">
							<FaTwitter />
							Twitter
						</p>
						<p className="text-gray-500 flex items-center gap-x-2">
							<FaInstagram />
							Instagram
						</p>
						<p className="text-gray-500 flex items-center gap-x-2">
							<FaYoutube />
							Youtube
						</p>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
