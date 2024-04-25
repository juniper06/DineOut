"use client";
import { cancelReservation } from "@/app/action";
import Pagination from "@/components/Pagination";
import RestaurantCard from "@/components/RestaurantCard";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";

export default function Reservations({
	reservations,
}: {
	reservations: Reservation[];
}) {
  
  const { toast } = useToast();
  
	const getStatus = (cancelled: boolean, date: number) => {
		const currentTimestamp = Date.now();
		if (!cancelled && currentTimestamp < date) {
			return "Ongoing";
		} else if (!cancelled && currentTimestamp >= date) {
			return "Success";
		} else {
			return "Cancelled";
		}
	};

	const handleCancelReservation = async (reservationId: number) => {
		await cancelReservation(reservationId);
		toast({
			title: "Successfully cancelled",
			description: "Your reservation has been cancelled.",
			variant: "success",
			action: (
				<ToastAction
					altText="Success"
					className="bg-red-500 text-white hover:bg-red-400 px-5">
					THANKS
				</ToastAction>
			),
		});
	};

	return (
		<div className="flex flex-col gap-y-4">
			{reservations.map(reservation => (
				<div
					className="grid grid-cols-4"
					key={reservation.id}>
					<Link href={`/restaurant/${reservation.restaurant.id}`}>
						<RestaurantCard
							className="col-span-1"
							image={reservation.restaurant.images[0]}
							name={reservation.restaurant.name}
							location={reservation.restaurant.address}
							ratings={
								reservation.restaurant.ratings !== 0
									? reservation.restaurant.ratings
									: 5
							}
						/>
					</Link>
					<div className="col-span-2 flex flex-col justify-center">
						<p className="font-medium">
							Reservation Date:{" "}
							{format(reservation.reservationDate, "LLLL dd, yyyy")}
						</p>
						<p className="font-medium">
							Reservation Time: {reservation.reservationTime}
						</p>
						<p className="font-medium">
							Guest Count: {reservation.countPeople}
						</p>
						<p className="font-medium">
							Reservation Status:
							<span>
								{" "}
								{getStatus(reservation.cancelled, reservation.reservationDate)}
							</span>
						</p>
						<p className="font-medium">
							Note:
							<span> {reservation.note}</span>
						</p>
					</div>
					<div className="col-span-1 flex items-center">
						{getStatus(reservation.cancelled, reservation.reservationDate) ===
							"Ongoing" && (
							<Button
								variant="primary"
								onClick={() => handleCancelReservation(reservation.id)}>
								Cancel Reservation
							</Button>
						)}
					</div>
				</div>
			))}
		</div>
	);
}
