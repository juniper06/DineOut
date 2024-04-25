"use client";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ImageContainer({ images }: { images: string[] }) {
	const [current, setCurrent] = React.useState(0);
	return (
		<div className="flex flex-col justify-between h-full gap-y-12 drop-shadow-md">
			<div className="relative flex-1 flex items-center overflow-hidden justify-center">
				<Image
					src={`http://localhost:8080/api/images/${images[current]}`}
					alt="Restaurant Image"
					width={500}
					height={500}
					className="object-fill scale-125 max-w-sm max-h-[500px] blur-sm absolute transition-all ease-in-out duration-300"
				/>
				<Image
					src={`http://localhost:8080/api/images/${images[current]}`}
					width={500}
					height={500}
					alt="Restaurant Image"
					className="object-scale-down rounded-lg max-w-sm max-h-[500px] z-10 transition-all ease-in-out duration-300 object-center"
				/>
			</div>
			<ScrollArea className="w-full whitespace-nowrap rounded-md border">
				<div className="flex gap-x-4 items-center">
					{images.map((image, i) => (
						<div className="overflow-hidden">
							<Image
								src={`http://localhost:8080/api/images/${image}`}
								alt="Restaurant Image"
								key={i}
								className={cn(
									"object-cover rounded-lg cursor-pointer max-h-[100px]",
									i === current && "border-4 border-red-300 "
								)}
								width={100}
								height={100}
								onClick={() => setCurrent(i)}
							/>
						</div>
					))}
				</div>
			</ScrollArea>
		</div>
	);
}
