import Loading from "@/app/(home)/profile/reviews/loading";
import { getReviewsByUserId } from "@/app/action";
import Pagination from "@/components/Pagination";
import ReviewsMade from "@/components/ReviewsMade";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getUserCookie } from "@/lib/cookies";
import React, { Suspense } from "react";

type SearchParams = {
	searchParams: {
		page: number;
	};
};

export default async function Page({ searchParams }: SearchParams) {
	const { page } = searchParams;
	const user = await getUserCookie();
	const paginated: PaginatedReviews = await getReviewsByUserId(
		user.userDetails?.id,
		page - 1
	);

	const reviews = paginated.content;

	return (
		<ScrollArea className="col-span-8 bg-cornsilk-500 rounded-3xl row-span-3 relative px-10 pb-4">
			<h1 className="text-center p-5 text-4xl font-bold">REVIEWS MADE</h1>
			<Separator className="bg-orange-500 h-1 mb-4" />
			<Suspense fallback={<Loading />}>
				<ReviewsMade reviews={reviews} />
			</Suspense>

			<Pagination
				totalPages={paginated.totalPages}
				page={page}
			/>
		</ScrollArea>
	);
}
