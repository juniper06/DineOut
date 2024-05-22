import React from "react";
import Image from "next/image";
import FoodsImage from "@/assets/image/foods.png";
import { Roboto_Slab } from "next/font/google";
import { cn } from "@/lib/utils";

const roboto_slab = Roboto_Slab({ subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<main className="bg-cornsilk-500 min-h-screen flex flex-col justify-center items-center">
			<div className="flex rounded-2xl overflow-hidden">
				<div className="md:flex hidden bg-orange-500 flex-1 w-[500px] py-10 flex-col justify-between overflow-hidden">
					<div className="flex h-full justify-center items-center">
						<h1
							className={cn(
								"text-center text-5xl text-white font-bold",
								roboto_slab.className
							)}>
							Your Companion in Uncovering Delicious Dining
						</h1>
					</div>

					<div className="h-2/3 bg-red-600 relative">
						<Image
							src={FoodsImage}
							alt="Foods"
							priority
							className="absolute bottom-0 left-0 w-[40rem] h-[20rem] object-cover"
						/>
					</div>
				</div>
				{children}
			</div>
			<div className="flex flex-col items-center w-full py-5 absolute bottom-0 left-0">
				<h3 className="text-black font-semibold">DineOut</h3>
				<p className="text-slate-600">Copyright &copy; 2023 DineOut, Inc</p>
			</div>
		</main>
	);
}
