import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
	return (
		<div className="col-span-8 bg-cornsilk-500 rounded-3xl row-span-3 relative px-10 pb-4">
			<h1 className="text-center p-5 text-4xl font-bold">REVIEWS MADE</h1>
			<Separator className="bg-orange-500 h-1 mb-4" />
			<div className="flex flex-col gap-y-4">
				<div className="grid gap-x-2">
					<div className="flex flex-col bg-white p-4 rounded-lg gap-y-2 col-span-4">
						<div className="flex justify-between">
							<div className="flex gap-x-4">
								<Avatar className="h-12 w-12 bg-orange-500 animate-pulse"></Avatar>
								<div className="flex flex-col justify-evenly">
									<Skeleton className="h-[28px] w-[250px] bg-orange-300" />
									<Skeleton className="h-[28px] w-[250px] bg-orange-200" />
								</div>
							</div>
							<div className="flex justify-evenly pt-3 gap-x-2 bg-orange-300"></div>
						</div>
						<Skeleton className="h-[28px] w-[250px] bg-orange-200" />
					</div>
				</div>
			</div>
		</div>
	);
}
