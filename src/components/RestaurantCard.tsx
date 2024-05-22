import Image from "next/image";
import React from "react";
import RestaurantImage from "@/assets/image/SampleRestaurant.png";
import { MdOutlineStar } from "react-icons/md";
import { cn } from "@/lib/utils";

type Props = {
	image: string;
	name: string;
	location: string;
	ratings: number;
  className?: string;
};

export default function RestaurantCard({
	image,
	name,
	location,
	ratings,
  className
}: Props) {
	return (
		<div className={cn("flex flex-col gap-y-2 drop-shadow-md hover:shadow-xl p-4 rounded-md cursor-pointer", className)}>
			{
				<Image
					src={
						image
							? `http://localhost:8080/api/images/${image}`
							: RestaurantImage
					}
					alt="Restaurant Image"
					className="object-contain rounded-lg min-h-[160px] max-h-40 bg-cornsilk-300"
					width={208}
					height={208}
				/>
			}
			<h6 className="text-xl font-bold truncate">{name}</h6>
			<h6 className="text-gray-500 text-sm">{location}</h6>
			<div className="flex">
				{Array.from({ length: 5 }).map((_, i) => (
					<MdOutlineStar
						key={i}
						className={cn(
							"w-5 h-5 text-red-500",
							i >= ratings && "text-gray-400"
						)}
					/>
				))}
			</div>
		</div>
	);
}
