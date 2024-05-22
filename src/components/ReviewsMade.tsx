"use client";
import { deleteReviewById } from "@/app/action";
import React from "react";
import RestaurantImage from "@/assets/image/placeholder.png";
import { cn, timeAgo } from "@/lib/utils";
import { MdOutlineStar } from "react-icons/md";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash } from "lucide-react";
import Image from "next/image";
import { RxUpdate } from "react-icons/rx";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import UpdateReviewForm from "@/components/form/UpdateReviewForm";

type Props = {
	reviews: Review[];
};

export default function ReviewsMade({ reviews }: Props) {
	const { toast } = useToast();
	const [alertDeleteReview, setAlertDeleteReview] = React.useState(false);
	const [openUpdateReview, setOpenUpdateReview] = React.useState(false);
	const [selectedReviewId, setSelectedReviewId] = React.useState(0);

	const deleteReview = async () => {
		await deleteReviewById(selectedReviewId);
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
		setAlertDeleteReview(false);
	};

  const selectReview = (reviewId: number, callback: (state: boolean) => void) => {
    setSelectedReviewId(reviewId);
    callback(true);
  }

	return (
		<div className="flex flex-col gap-y-4">
			{reviews.map(review => (
				<div
					className="grid gap-x-2"
					key={review.id}>
					<div className="flex flex-col bg-white p-4 rounded-lg gap-y-2">
						<div className="flex justify-between">
							<div className="flex gap-x-4">
								<Image
									src={
										review.restaurant.images.length > 0
											? `http://localhost:8080/api/images/${review.restaurant.images[0]}`
											: RestaurantImage
									}
									alt="Restaurant Image"
									className="object-contain rounded-lg max-h-40"
									width={40}
									height={40}
								/>
								<div className="flex flex-col justify-evenly">
									<h6 className="font-bold">{review.restaurant.name}</h6>
									<p className="text-sm">{timeAgo(review.date)}</p>
								</div>
							</div>
							<div className="flex flex-col items-end">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											variant="ghost"
											size="sm">
											<MoreHorizontal />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent>
										<DropdownMenuLabel>Actions</DropdownMenuLabel>
										<DropdownMenuGroup>
											<DropdownMenuItem
												onClick={() => selectReview(review.id, setOpenUpdateReview)}
												className="text-blue-500">
												<RxUpdate className="mr-2 h-4 w-4" />
												Update
											</DropdownMenuItem>
											<DropdownMenuItem
												onClick={() => selectReview(review.id, setAlertDeleteReview)}
												className="text-red-500">
												<Trash className="mr-2 h-4 w-4" />
												Delete
											</DropdownMenuItem>
										</DropdownMenuGroup>
									</DropdownMenuContent>
								</DropdownMenu>

								<div className="flex justify-evenly pt-3 gap-x-2">
									{Array.from({ length: 5 }).map((_, i) => (
										<MdOutlineStar
											key={i}
											className={cn(
												"w-5 h-5 text-red-500",
												i >= review.rating && "text-gray-400"
											)}
										/>
									))}
								</div>
							</div>
						</div>
						<p>{review.comment}</p>
					</div>
				</div>
			))}

			<AlertDialog
				open={alertDeleteReview}
				onOpenChange={setAlertDeleteReview}>
				<AlertDialogContent className="bg-cornsilk-500">
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure?</AlertDialogTitle>
					</AlertDialogHeader>
					<AlertDialogDescription>
						This action cannot be undone. Are you sure you want to delete?
					</AlertDialogDescription>
					<AlertDialogFooter>
						<AlertDialogCancel className="text-gray-500">
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							className="bg-red-500"
							onClick={() => deleteReview()}>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			<Dialog
				open={openUpdateReview}
				onOpenChange={setOpenUpdateReview}>
				<DialogContent>
					<DialogTitle>Update Review</DialogTitle>
					<UpdateReviewForm
						id={selectedReviewId}
						closeDialog={() => setOpenUpdateReview(false)}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}
