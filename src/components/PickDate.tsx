"use client";
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ReservationAction } from "@/components/hooks/useReservation";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
	date: Date | undefined;
	dispatch: React.Dispatch<ReservationAction>;
};

export function PickDate({ date, dispatch }: Props) {
	const handleSelectedDate = (selectedDate: Date | undefined) => {
		if (date !== undefined) {
			dispatch({ type: "DATE", payload: selectedDate });
		}
	};

	return (
		<Popover>
			<PopoverTrigger>
				<ShowDate date={date || new Date()} />
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					mode="single"
					selected={date}
					onSelect={handleSelectedDate}
					disabled={date => date <= new Date()}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}

function ShowDate({ date }: { date: Date }) {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<div className="bg-white w-full h-full flex flex-col items-center hover:bg-accent p-3 rounded-md">
					<h1 className="text-4xl">{format(date, "do")}</h1>
					<p className="text-2xl">{format(date, "LLLL, EEEE")}</p>
				</div>
			</TooltipTrigger>
			<TooltipContent>
				<p>Pick a date</p>
			</TooltipContent>
		</Tooltip>
	);
}
