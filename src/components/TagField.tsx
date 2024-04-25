import { getTags } from "@/app/action";
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

export function TagField({ form }: { form: UseFormReturn<FormSchema> }) {
	const [tags, setTags] = React.useState<ItemType[]>([]);

	React.useEffect(() => {
		const fetchAll = async () => {
			await getTags().then(data => setTags(data));
		};

		fetchAll();
	}, []);
	return (
		<FormField
			control={form.control}
			name="tags"
			render={({ field }) => (
				<FormItem className="flex flex-col">
					<FormLabel>Tags</FormLabel>
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
									{field.value && field.value.length > 0
										? field.value
												.map(
													selectedValue =>
														tags.find(tag => tag.id === selectedValue)?.name
												)
												.filter(Boolean)
												.join(", ")
										: "Select Tags"}
									<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent className="p-0">
							<Command>
								<CommandInput placeholder="Search tags..." />
								<CommandEmpty>No tags found.</CommandEmpty>
								<CommandGroup>
									{tags.map(tag => (
										<CommandItem
											value={tag.name}
											key={tag.id}
											onSelect={() => {
												const currentValues = form.getValues("tags") || [];
												const isSelected = currentValues.includes(tag.id);

												if (isSelected) {
													const updatedValues = currentValues.filter(
														val => val !== tag.id
													);
													form.setValue("tags", updatedValues);
												} else {
													form.setValue("tags", [...currentValues, tag.id]);
												}
											}}>
											<Check
												className={cn(
													"mr-2 h-4 w-4",
													field.value?.includes(tag.id)
														? "opacity-100"
														: "opacity-0"
												)}
											/>
											{tag.name}
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
