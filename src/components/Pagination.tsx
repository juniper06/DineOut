"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

type Props = {
	totalPages: number;
	page: number;
};

export default function Pagination({ totalPages, page }: Props) {
	const searchParams = useSearchParams();
	const { replace } = useRouter();
	const pathName = usePathname();

	const handleChangePage = (newPage: number) => {
		const params = new URLSearchParams(searchParams);
		params.set("page", newPage.toString());
		replace(`${pathName}?${params}`);
	};

	const renderPageButtons = () => {
		const maxButtons = 2; // Number of buttons to display on either side of the current page
		const buttons = [];

		// Display page buttons
		for (
			let i = Math.max(1, page - maxButtons);
			i <= Math.min(totalPages, page + maxButtons);
			i++
		) {
			buttons.push(
				<Button
					key={i}
					onClick={() => handleChangePage(i)}
					className={cn(
						"bg-transparent border text-black-500 border-black hover:bg-red-500 hover:text-white",
						i === page && "text-red-500 border-red-500"
					)}>
					{i}
				</Button>
			);
		}

		return buttons;
	};

	return (
		<div className="flex gap-x-4 p-4 justify-center">
			<Button
				disabled={page === 1}
				onClick={() => handleChangePage(page - 1)}
				className={cn(
					"bg-transparent text-black-500 border-black border hover:bg-red-500 hover:text-white"
				)}>
				<MdArrowBackIos />
				Previous
			</Button>
			{renderPageButtons()}
			<Button
				disabled={totalPages === page}
				onClick={() => handleChangePage(page + 1)}
				className={cn(
					"bg-transparent  text-black-500 border-black border hover:bg-red-500 hover:text-white"
				)}>
				Next
				<MdArrowForwardIos />
			</Button>
		</div>
	);
}
