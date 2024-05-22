"use client";
import React from "react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { IoMdArrowDropdown } from "react-icons/io";
import { HiMiniUserCircle } from "react-icons/hi2";

import { cn } from "@/lib/utils";
import useAuth from "@/components/hooks/useAuth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function ProfileMenu() {
	const { toast } = useToast();
	const { user, onLogout } = useAuth();
	const [open, setOpen] = React.useState(false);

	const handleLogout = async () => {
		await onLogout();
		toast({
			title: "Successfully logged out",
			description: "You may logged in",
			variant: "success",
		});
	};

	return (
		<Popover
			open={open}
			onOpenChange={setOpen}>
			<PopoverTrigger className="bg-red-500 hover:bg-red-400 cursor-pointer flex text-white rounded-md p-2 drop-shadow-md">
				<HiMiniUserCircle className="text-4xl " />
				<IoMdArrowDropdown
					className={cn(
						"text-4xl transform duration-300",
						open && "rotate-180"
					)}
				/>
			</PopoverTrigger>
			<PopoverContent align="end">
				<div className="flex flex-col select-none ">
					<h3 className="p-3">
						Welcome,
						<span className="text-red-950 font-bold">
							{" "}
							@{user.userDetails?.username}
						</span>
					</h3>
					<Link
						href="/profile"
						className="flex hover:bg-red-100 transition-colors duration-300 p-3 cursor-pointer rounded-md text-sm font-medium"
						onClick={() => setOpen(false)}>
						Profile
					</Link>
					{user.userDetails?.role === "ADMIN" && (
						<Link
							href="/dashboard"
							className="flex hover:bg-red-100 transition-colors duration-300 p-3 cursor-pointer rounded-md text-sm font-medium"
							onClick={() => setOpen(false)}>
							Dashboard
						</Link>
					)}

					<Button
						variant="ghost"
						className="flex hover:bg-red-100 transition-colors duration-300 p-3 cursor-pointer rounded-md justify-start text-sm font-medium"
						onClick={handleLogout}>
						Logout
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
}
