"use client";
import React from "react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import CantDecide from "@/assets/image/foodPromos.png";
import { getRandomRestaurant } from "@/app/action";
import RestaurantCard from "@/components/RestaurantCard";
import Link from "next/link";
import { X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function Randomizer() {
	const [open, setOpen] = React.useState(false);

	const setClose = () => {
		setOpen(false);
	};

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					className="text-white tracking-wider bg-transparent font-medium"
					variant="outline">
					Randomizer
				</Button>
			</DialogTrigger>
			<DialogContent className="w-1/2 h-1/2 flex flex-col justify-center items-center px-24 bg-cornsilk-500">
				<DialogClose className="absolute top-4 right-4">
					<X />
				</DialogClose>
				<Image
					alt="Can't Decide Image"
					src={CantDecide}
				/>
				<h1 className="text-2xl font-bold text-center">
					Still Can't decide where to eat?
				</h1>
				<p className="text-center ">
					Generate a random restaurant with our randomizer
				</p>
				<DialogClose asChild>
					<Picked setClose={setClose} />
				</DialogClose>
			</DialogContent>
		</Dialog>
	);
}

export function Picked({ setClose }: { setClose: () => void }) {
  
  const { toast } = useToast();
	const [restaurant, setRestaurant] = React.useState<Restaurant | undefined>(
		undefined
	);

	const [open, setOpen] = React.useState(false);

	React.useEffect(() => {
		const fetchRandomRestaurant = async () => {
			try {
				setRestaurant(await getRandomRestaurant());
			} catch (error) {
				toast({
					title: "Something is wrong!",
					description: "Check the restaurants if none",
          variant: "destructive"
				});
			}
		};
		if (open) {
			fetchRandomRestaurant();
		}
	}, [open]);

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant="primary"
					size="lg"
					className="w-full h-">
					Click for a suprise
				</Button>
			</DialogTrigger>
			<DialogContent className="w-1/2 h-1/2 flex flex-col justify-center items-center px-24 bg-cornsilk-500">
				<h1 className="text-2xl font-bold text-center">
					Still can't decide where to eat?
				</h1>
				{restaurant && (
					<RestaurantCard
						image={restaurant.images[0]}
						name={restaurant.name}
						location={restaurant.address}
						ratings={restaurant.ratings !== 0 ? restaurant.ratings : 5}
						className="items-center"
					/>
				)}
				<div className="flex gap-x-6">
					<Button
						onClick={() => setOpen(false)}
						variant="outline"
						size="lg"
						className="w-full text-red-500 border border-red-500 bg-transparent hover:bg-red-500 hover:text-white">
						No, try another
					</Button>
					<Link href={`/restaurant/${restaurant?.id}`}>
						<Button
							variant="primary"
							size="lg"
							className="w-full"
							onClick={setClose}>
							Click for a suprise
						</Button>
					</Link>
				</div>
			</DialogContent>
		</Dialog>
	);
}
