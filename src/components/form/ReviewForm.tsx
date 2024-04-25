"use client";
import { addReviews } from "@/app/action";
import useAuth from "@/components/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState } from "react";
import { MdOutlineStar } from "react-icons/md";

export default function ReviewForm({ id }: { id: number }) {
	const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
	const [rating, setRating] = useState(5);
	const { user } = useAuth();
  const { toast } = useToast();
  
	const handleTextAreaInput = () => {
		const textarea = textAreaRef.current;

		if (textarea) {
			textarea.style.height = "auto"; // Reset height to auto to calculate actual height needed
			textarea.style.height = `${textarea.scrollHeight}px`; // Set the height based on content
		}
	};

	const handleSubmitForm = async () => {
		if (textAreaRef.current?.value === "" || !textAreaRef.current) {
			toast({
				title: "Comment is required",
				variant: "destructive",
				description: "Please try again",
			});
			return;
		}
		await addReviews(id, {
			userId: user.userDetails?.id,
			comment: textAreaRef.current?.value,
			rating: rating,
		});
		if (textAreaRef.current) {
			textAreaRef.current.value = "";
		}
		setRating(5);
	};

	if (!user.isAuthenticated) {
		return (
			<div className="w-full bg-white p-4 rounded-lg flex-col flex">
				<h1 className="text-center font-semibold text-2xl">
					Please log in to add review 
				</h1>
				<Link href="/login" className="text-center">
					<Button variant="link">Click here to Login</Button>
				</Link>
			</div>
		);
	}

	return (
		<div className="w-full bg-white flex p-4 rounded-lg">
			<textarea
				ref={textAreaRef}
				onChange={handleTextAreaInput}
				onKeyDown={handleTextAreaInput}
				onKeyUp={handleTextAreaInput}
				rows={5}
				placeholder="Write a review..."
				className="w-full resize-none focus-visible:ring-0 focus:border-none focus-visible:outline-none outline-none ring-0 border-none"
			/>
			<div className="flex flex-col justify-between">
				<div className="flex justify-evenly pt-3 flex-row-reverse">
					{Array.from({ length: 5 }, (_, i) => 5 - i).map(num => (
						<MdOutlineStar
							onClick={() => setRating(num)}
							key={num}
							className={cn(
								"cursor-pointer text-gray-400 peer peer-hover:text-red-500 hover:text-red-500 w-5 h-5",
								num <= rating && "text-red-500"
							)}
						/>
					))}
				</div>
				<Button
					variant="primary"
					size="lg"
					onClick={handleSubmitForm}
					className="drop-shadow-md w-fit rounded-xl">
					Post review
				</Button>
			</div>
		</div>
	);
}
