"use client";
import { ReservationAction } from "@/components/hooks/useReservation";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import * as React from "react";
import { FaClock } from "react-icons/fa";

type Props = {
	dispatch: React.Dispatch<ReservationAction>;
};

const TimePicker = ({ dispatch }: Props) => {
	const date = new Date();
	const [fromHours, setFromHours] = React.useState(date.getHours() % 12 + 1);
	const [fromMinutes, setFromMinutes] = React.useState(date.getMinutes());
	const [fromPeriod, setFromPeriod] = React.useState(date.getHours() < 12 ? "AM" : "PM");
	const [toHours, setToHours] = React.useState(date.getHours() % 12 + 1);
	const [toMinutes, setToMinutes] = React.useState(date.getMinutes());
	const [toPeriod, setToPeriod] = React.useState(date.getHours() < 12 ? "AM" : "PM");

	return (
		<Popover>
			<PopoverTrigger>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="ghost" asChild>
							<div className="flex flex-col h-full gap-y-2 cursor-pointer">
								<FaClock className="h-6 w-6" />
								<p>
									{fromHours}:{fromMinutes < 10 ? `0${fromMinutes}` : fromMinutes} {fromPeriod} - {toHours}:{toMinutes < 10 ? `0${toMinutes}` : toMinutes} {toPeriod}
								</p>
							</div>
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Pick a time</p>
					</TooltipContent>
				</Tooltip>
			</PopoverTrigger>
			<PopoverContent
				onCloseAutoFocus={() =>
					dispatch({
						type: "TIME",
						payload: `${fromHours}:${fromMinutes < 10 ? `0${fromMinutes}` : fromMinutes} ${fromPeriod} - ${toHours}:${toMinutes < 10 ? `0${toMinutes}` : toMinutes} ${toPeriod}`,
					})
				}
			>
				<h1>From:</h1>
				<div className="flex">
					<select
						value={fromHours}
						onChange={(e) => setFromHours(parseInt(e.target.value))}
					>
						{Array.from({ length: 12 }, (_, i) => (
							<option key={i + 1} value={i + 1}>
								{i + 1}
							</option>
						))}
					</select>
					<select
						value={fromMinutes}
						onChange={(e) => setFromMinutes(parseInt(e.target.value))}
					>
						{Array.from({ length: 60 }, (_, i) => (
							<option key={i} value={i}>
								{i < 10 ? `0${i}` : i}
							</option>
						))}
					</select>
					<Button
						variant="outline"
						onClick={() => setFromPeriod(fromPeriod === "AM" ? "PM" : "AM")}
					>
						{fromPeriod}
					</Button>
				</div>
				<h1>To:</h1>
				<div className="flex">
					<select
						value={toHours}
						onChange={(e) => setToHours(parseInt(e.target.value))}
					>
						{Array.from({ length: 12 }, (_, i) => (
							<option key={i + 1} value={i + 1}>
								{i + 1}
							</option>
						))}
					</select>
					<select
						value={toMinutes}
						onChange={(e) => setToMinutes(parseInt(e.target.value))}
					>
						{Array.from({ length: 60 }, (_, i) => (
							<option key={i} value={i}>
								{i < 10 ? `0${i}` : i}
							</option>
						))}
					</select>
					<Button
						variant="outline"
						onClick={() => setToPeriod(toPeriod === "AM" ? "PM" : "AM")}
					>
						{toPeriod}
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default TimePicker;