"use client";
import AddRestaurantForm from "@/components/form/AddRestaurantForm";
import useAuth from "@/components/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React from "react";
import { IoMdAdd } from "react-icons/io";

export default function AddRestaurantButton() {
  const [open, setOpen] = React.useState(false);
	const { user } = useAuth();
	if (user.userDetails?.role !== "ADMIN") {
		return null;
	}
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					className="gap-2"
					variant="primary">
					<IoMdAdd /> New Restaurant
				</Button>
			</DialogTrigger>
			<DialogContent className="bg-cornsilk-500">
        <h1 className="text-center text-medium text-lg">Restaurant Form</h1>
				<AddRestaurantForm closeDialog={() => setOpen(false)}/>
			</DialogContent>
		</Dialog>
	);
}
