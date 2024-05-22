"use server";
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReviewForm from "@/components/form/ReviewForm";
import { Review, getReviewsByRestaurantId } from "@/app/action";
import ReviewCard from "@/components/ReviewCard";

export default async function ReviewsDialog({ id }: { id: number }) {
	const reviews: Review[] = await getReviewsByRestaurantId(id);
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					size="lg"
					className="w-full drop-shadow-md bg-orange-500 text-red-500 underline font-semibold underline-offset-2 hover:bg-red-500 hover:text-white transition-colors duration-300 ease-in-out">
					VIEWS REVIEWS
				</Button>
			</DialogTrigger>
			<DialogContent className="bg-cornsilk-500 h-5/6 max-w-xl">
				<ScrollArea>
					<div className="flex flex-col gap-y-5 p-6">
						<ReviewForm id={id}/>
						<h1 className="text-2xl font-bold text-center">Reviews</h1>
						{reviews.map(review => (
							<ReviewCard review={review} key={review.id}/>
						))}
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}
