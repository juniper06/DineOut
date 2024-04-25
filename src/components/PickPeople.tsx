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
import React from "react";
import { IoPersonSharp } from "react-icons/io5";

type Props = {
	dispatch: React.Dispatch<ReservationAction>;
};

export default function PickPeople({ dispatch }: Props) {
	const [countPeople, setCountPeople] = React.useState(1);

	return (
		<Popover>
			<PopoverTrigger>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							asChild>
							<div className="flex flex-col gap-y-2 h-full items-center p-4">
								<IoPersonSharp className="h-6 w-6" />
								<p className="whitespace-nowrap font-medium">
									{countPeople} people
								</p>
							</div>
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Pick a number</p>
					</TooltipContent>
				</Tooltip>
			</PopoverTrigger>
			<PopoverContent
				onCloseAutoFocus={() =>
					dispatch({
						type: "PEOPLE",
						payload: countPeople,
					})
				}>
				<div className="flex flex-col gap-y-4">
          <p className="font-medium">Pick a total number of people</p>
					<Slider
						min={1}
						max={25}
						step={1}
						defaultValue={[countPeople]}
						onValueChange={value => setCountPeople(value[0])}
					/>
				</div>
			</PopoverContent>
		</Popover>
	);
}
