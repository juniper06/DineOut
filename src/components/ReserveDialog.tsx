"use client";
import LoginMessage from "@/components/LoginMessage";
import ReservationForm from "@/components/form/ReservationForm";
import useAuth from "@/components/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React from "react";

export default function ReserveDialog({
	restaurant,
}: {
	restaurant: Restaurant;
}) {
  const [open, setOpen] = React.useState(false);
  const { user } = useAuth();
  if(open && !user.isAuthenticated) {
    LoginMessage();
    setOpen(false)
  }

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant="primary"
					size="lg"
					className="w-full drop-shadow-md">
					Reserve
				</Button>
			</DialogTrigger>
			<DialogContent className="bg-cornsilk-500 h-5/6 max-w-lg flex flex-col px-14">
				<ReservationForm restaurant={restaurant} />
			</DialogContent>
		</Dialog>
	);
}
