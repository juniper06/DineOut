"use client";

import UpdateRestaurantForm from "@/components/form/UpdateRestaurantForm";
import useAuth from "@/components/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React from "react";

export default function AddRestaurantButton({
	restaurant,
}: {
	restaurant: Restaurant;
}) {
	const [open, setOpen] = React.useState(false);
	const { user } = useAuth();
	if (user.userDetails?.role !== "ADMIN") {
		return null;
	}
	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					size="sm"
					className="rounded-full px-5 bg-[#55adf7]">
					Update
				</Button>
			</DialogTrigger>
			<DialogContent className="bg-cornsilk-500">
				<h1 className="text-center text-medium text-lg">Restaurant Form</h1>
				<UpdateRestaurantForm
					restaurant={restaurant}
					closeDialog={() => setOpen(false)}
				/>
			</DialogContent>
		</Dialog>
	);
}
