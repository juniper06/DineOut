import { getTypes } from "@/app/action";
import { FormSchema, ItemType } from "@/components/form/AddRestaurantForm";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import React from "react";
import { UseFormReturn } from "react-hook-form";

export function TypeField({ form }: { form: UseFormReturn<FormSchema> }) {
	const [types, setTypes] = React.useState<ItemType[]>([]);

	React.useEffect(() => {
		const fetchAll = async () => {
			await getTypes().then(data => setTypes(data));
		};

		fetchAll();
	}, []);
	return (
		<FormField
			control={form.control}
			name="type"
			render={({ field }) => (
				<FormItem className="flex flex-col">
					<FormLabel>Types</FormLabel>
					<Popover>
						<PopoverTrigger asChild>
							<FormControl>
								<Button
									variant="outline"
									role="combobox"
									className={cn(
										"justify-between",
										!field.value && "text-muted-foreground"
									)}>
									{field.value
										? types.find(type => type.id === field.value)?.name
										: "Select Type"}
									<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent className="p-0">
							<Command>
								<CommandInput placeholder="Search types..." />
								<CommandEmpty>No types found.</CommandEmpty>
								<CommandGroup>
									{types.map(type => (
										<CommandItem
											value={type.name}
											key={type.id}
											onSelect={() => {
												form.setValue("type", type.id);
											}}>
											<Check
												className={cn(
													"mr-2 h-4 w-4",
													field.value === type.id ? "opacity-100" : "opacity-0"
												)}
											/>
											{type.name}
										</CommandItem>
									))}
								</CommandGroup>
							</Command>
						</PopoverContent>
					</Popover>
				</FormItem>
			)}
		/>
	);
}
