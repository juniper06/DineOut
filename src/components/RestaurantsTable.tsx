"use client";
import { deleteRestaurant } from "@/app/action";
import UpdateRestaurantButton from "@/components/UpdateRestaurantButton";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import React from "react";

export default function RestaurantsTable({
	restaurants,
}: {
	restaurants: Restaurant[];
}) {
	const { toast } = useToast();
	const handleDeleteRestaurant = async (restaurantId: number) => {
		try {
			await deleteRestaurant(restaurantId);
			toast({
				title: "Successfully Deleted",
				description: "Your Review has been deleted.",
				variant: "success",
				action: (
					<ToastAction
						altText="Success"
						className="bg-red-500 text-white hover:bg-red-400 px-5">
						THANKS
					</ToastAction>
				),
			});
		} catch (error) {
			console.log("Something's wrong with deleting the restaurant: ", error);
		}
	};

	return (
		<table className="my-4 bg-cornsilk-500 rounded-lg">
			<thead className="border-b-4 border-orange-500">
				<tr>
					<th className="border-r-4 border-orange-500 p-2 ">ID</th>
					<th className="border-r-4 border-orange-500 p-2">NAME</th>
					<th className="border-r-4 border-orange-500 p-2">HOURS</th>
					<th className="border-r-4 border-orange-500 p-2">Tags</th>
					<th className="border-r-4 border-orange-500 p-2">Location</th>
					<th className="border-r-4 border-orange-500 p-2">Rating</th>
					<th className="p-2">Action</th>
				</tr>
			</thead>
			<tbody>
				{restaurants.map(restaurant => (
					<tr
						className="border-b-4 border-orange-500"
						key={restaurant.id}>
						<td className="text-center border-r-4 border-orange-500">
							{restaurant.id}
						</td>
						<td className="text-center border-r-4 border-orange-500">
							{restaurant.name}
						</td>
						<td className="text-center border-r-4 border-orange-500">
							{restaurant.serviceHours}
						</td>

						<td className="border-r-4 border-orange-500">
							<div className="h-full w-full flex flex-col items-center gap-y-2 px-2 py-4">
								{restaurant.tags.map(tag => (
									<Link
										href={`/discover?tags=${tag.name}`}
										key={tag.id}>
										<Button
											variant="primary"
											size="sm"
											className="rounded-full px-5">
											{tag.name}
										</Button>
									</Link>
								))}
							</div>
						</td>
						<td className="text-center border-r-4 border-orange-500">
							{restaurant.address}
						</td>
						<td className="text-center border-r-4 border-orange-500">
							{restaurant.ratings}
						</td>
						<td>
							<div className="h-full w-full flex flex-col items-center gap-y-2 px-2 py-4">
								<Link href={`/restaurant/${restaurant.id}`}>
									<Button
										size="sm"
										className="rounded-full px-5 bg-indigo-500">
										Link
									</Button>
								</Link>
								<UpdateRestaurantButton restaurant={restaurant} />
								<Button
									size="sm"
									className="rounded-full px-5 bg-[#e25932]"
									onClick={() => handleDeleteRestaurant(restaurant.id)}>
									Delete
								</Button>
							</div>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
