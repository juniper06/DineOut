import { Review } from "@/app/action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, timeAgo } from "@/lib/utils";
import React from "react";
import { MdOutlineStar } from "react-icons/md";

export default function ReviewCard({ review }: { review: Review }) {
	return (
		<div
			className="flex flex-col bg-white p-4 rounded-lg gap-y-2"
			key={review.id}>
			<div className="flex justify-between">
				<div className="flex gap-x-4">
					<Avatar className="h-16 w-16">
						<AvatarImage
							src={
								review?.user.image
									? `http://localhost:8080/api/images/${review.user.image}`
									: `https://ui-avatars.com/api/?background=random&name=${review.user.name}`
							}
							alt="Profile Picture"
						/>
						<AvatarFallback>{review.user.name}</AvatarFallback>
					</Avatar>
					<div className="flex flex-col justify-evenly">
						<h6>@{review.user.username}</h6>
						<p className="text-sm">{timeAgo(review.date)}</p>
					</div>
				</div>
				<div className="flex justify-evenly pt-3 gap-x-2">
					{Array.from({ length: 5 }).map((_, i) => (
						<MdOutlineStar
							key={i}
							className={cn(
								"w-5 h-5 text-red-500",
								i  >= review.rating && "text-gray-400"
							)}
						/>
					))}
				</div>
			</div>
			<p>{review.comment}</p>
		</div>
	);
}
