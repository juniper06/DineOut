"use client";
import { ReservationAction } from "@/components/hooks/useReservation";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
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
	const [fromHours, setFromHours] = React.useState(date.getHours() % 13);
	const [fromPeriod, setFromPeriod] = React.useState("AM");
	const [toHours, setToHours] = React.useState(date.getHours() % 13);
	const [toPeriod, setToPeriod] = React.useState("AM");

	const handleFromHours = (hours: number[]) => {
		setFromHours(hours[0] % 13);
	};
	const handleToHours = (hours: number[]) => {
		setToHours(hours[0] % 12);
	};

	return (
		<Popover>
			<PopoverTrigger>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							asChild>
							<div className="flex flex-col h-full gap-y-2 cursor-pointer">
								<FaClock className="h-6 w-6" />
								<p>
									{fromHours}
									{fromPeriod} - {toHours}
									{toPeriod}
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
						payload: `${fromHours}${fromPeriod} - ${toHours}${toPeriod}`,
					})
				}>
				<h1>From:</h1>
				<div className="flex">
					<Slider
						min={1}
						max={12}
						step={1}
						defaultValue={[fromHours]}
						onValueChange={handleFromHours}
					/>
					<Button
						variant="outline"
						onClick={() => setFromPeriod(fromPeriod === "AM" ? "PM" : "AM")}>
						{fromPeriod}
					</Button>
				</div>
				<h1>To:</h1>
				<div className="flex">
					<Slider
						min={1}
						max={12}
						step={1}
						defaultValue={[toHours]}
						onValueChange={handleToHours}
					/>
					<Button
						variant="outline"
						onClick={() => setToPeriod(toPeriod === "AM" ? "PM" : "AM")}>
						{toPeriod}
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default TimePicker;
