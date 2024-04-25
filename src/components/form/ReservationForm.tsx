"use client";
import { ReservationProps, addReservations } from "@/app/action";
import { PickDate } from "@/components/PickDate";
import PickPeople from "@/components/PickPeople";
import TimePicker from "@/components/TimePicker";
import useAuth from "@/components/hooks/useAuth";
import useReservation from "@/components/hooks/useReservation";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";

export default function ReservationForm({
	restaurant,
}: {
	restaurant: Restaurant;
}) {
	const [state, dispatch] = useReservation();
	const { user } = useAuth();
  const { toast } = useToast();

	const handleSubmit = async () => {
		const data: ReservationProps = {
			restaurantId: restaurant.id,
			userId: user.userDetails?.id,
			reservationDate: state.reservationDate,
			note: state.note,
			reservationTime: state.reservationTime,
			countPeople: state.people,
		};
		await addReservations(data);
		toast({
			title: "CONGRATULATIONS!",
			description: "Your reservation has been successfully confirmed. Enjoy!",
      variant: "success",
      action: <ToastAction altText="Success" className="bg-red-500 text-white hover:bg-red-400 px-5">THANKS</ToastAction>,
		});
	};

	return (
		<>
			<h1 className="text-center font-bold text-2xl pt-8">
				CONFIRM RESERVATION
			</h1>
			<div className="bg-white w-full h-full flex flex-col items-center py-8">
				<PickDate
					date={state.reservationDate}
					dispatch={dispatch}
				/>
				<div className="flex items-center">
					<FaLocationDot />
					<h6>{restaurant.address}</h6>
				</div>
				<h1 className="text-4xl font-bold py-5 text-center">{restaurant.name}</h1>
				<div className="flex justify-center gap-x-6 w-full items-center">
					<TimePicker dispatch={dispatch} />
					<PickPeople dispatch={dispatch} />
				</div>
				<fieldset className="w-4/6 h-full border-2 border-black p-4">
					<legend className="text-center bg-white px-12">Note</legend>
					<textarea
						className="w-full h-full overflow-hidden resize-none focus-visible:ring-0 focus:border-none focus-visible:outline-none outline-none ring-0 border-none"
						value={state.note}
						onChange={e => dispatch({ type: "NOTE", payload: e.target.value })}
					/>
				</fieldset>
			</div>
			<div className="grid justify-between grid-cols-2 gap-x-16">
				<DialogClose asChild>
					<Button
						variant="outline"
						className="bg-transparent border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
						Cancel
					</Button>
				</DialogClose>

				<DialogClose asChild>
					<Button
						type="submit"
						variant="primary"
						onClick={handleSubmit}>
						Confirm
					</Button>
				</DialogClose>
			</div>
		</>
	);
}
