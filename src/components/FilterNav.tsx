"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MdOutlineStar } from "react-icons/md";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MdOutlineTableRestaurant } from "react-icons/md";
import { GrRestaurant } from "react-icons/gr";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { RiRestaurantLine } from "react-icons/ri";
import useFilterParams from "@/components/hooks/useFilterParams";

type FilterType = {
	id: number;
	name: string;
};

type Props = {
	types: FilterType[];
	cuisines: FilterType[];
	tags: FilterType[];
};

export default function FilterNav({ types, cuisines, tags }: Props) {
	return (
		<ScrollArea className="h-full w-full bg-cornsilk-500">
			<div className="p-4 py-14 flex flex-col mb-40">
				<h1 className="font-semibold text-xl mb-5">Quick Filters</h1>
				<div className="flex space-x-2 items-center my-5">
					<MdOutlineStar className="text-xl" />
					<h3 className="font-semibold">Rating</h3>
				</div>
				<Ratings />
				<div className="flex gap-2 mb-5 mt-10 items-center">
					<MdOutlineTableRestaurant className="text-xl" />
					<h3 className="font-semibold">Type</h3>
				</div>
				<Types items={types}/>
				<div className="flex gap-2 mb-5 mt-10 items-center">
					<GrRestaurant className="text-xl" />
					<h3 className="font-semibold">Tags</h3>
				</div>
				<Tags items={tags}/>
				<div className="flex space-x-2 items-center my-5">
					<RiRestaurantLine className="text-xl" />
					<h3 className="font-semibold">Cuisine</h3>
				</div>
				<Cuisines items={cuisines}/>
			</div>
		</ScrollArea>
	);
}

function FilterGroup({
	items,
	paramName,
}: {
	items: FilterType[];
	paramName: string;
}) {
	const { defaultValue, handleFilterChange } = useFilterParams(paramName);

	return (
		<RadioGroup
			defaultValue={defaultValue}
			onValueChange={handleFilterChange}
			className="gap-y-3 mb-4">
			{items.map(item => (
				<div
					className="flex items-center space-x-2"
					key={item.id}>
					<RadioGroupItem
						value={item.name}
						id={item.name}
					/>
					<Label
						htmlFor={item.name}
						className="cursor-pointer">
						{item.name}
					</Label>
				</div>
			))}
		</RadioGroup>
	);
}

function Tags({ items }: { items: FilterType[] }) {
	const searchParams = useSearchParams();
	const [checkedValues, setCheckedValues] = React.useState<string[]>([]);
	const { replace } = useRouter();
	const pathname = usePathname();

	React.useEffect(() => {
		const params = new URLSearchParams(searchParams);
		params.set("tags", checkedValues.toString());
		if (checkedValues.length === 0) {
			params.delete("tags");
		}
		replace(`${pathname}?${params.toString()}`);
	}, [checkedValues]);

	React.useEffect(() => {
		const tagsParam = searchParams.get("tags");
		if (tagsParam) {
			const tags = tagsParam.split(",");
			setCheckedValues(tags);
		}
	}, [searchParams]);

	const handleCheckboxChange = (isChecked: CheckedState, value: string) => {
		if (isChecked) {
			setCheckedValues(prevValues => [...prevValues, value]);
		} else {
			setCheckedValues(prevValues => prevValues.filter(val => val !== value));
		}
	};

	return (
		<div className="gap-y-3 mb-10 flex flex-col">
			{items.map(item => (
				<div
					className="flex items-center space-x-2"
					key={item.id}>
					<Checkbox
						name="tags"
						value={item.name}
						id={item.name}
						checked={checkedValues.includes(item.name)}
						onCheckedChange={isChecked =>
							handleCheckboxChange(isChecked, item.name)
						}
						className="data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
					/>
					<Label
						htmlFor={item.name}
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
						{item.name}
					</Label>
				</div>
			))}
		</div>
	);
}

function Ratings() {
	return (
		<FilterGroup
			items={[
				{ id: 1, name: "All" },
				{ id: 2, name: "5" },
				{ id: 3, name: "4" },
				{ id: 4, name: "3" },
				{ id: 5, name: "2" },
				{ id: 6, name: "1" },
			]}
			paramName="ratings"
		/>
	);
}

function Types({ items }: { items: FilterType[] }) {
  const updatedItems = [{ id: 0, name: "All" }, ...items];

	return (
		<FilterGroup
			items={updatedItems}
			paramName="type"
		/>
	);
}

function Cuisines({ items }: { items: FilterType[] }) {
  const updatedItems = [{ id: 0, name: "All" }, ...items];

	return (
		<FilterGroup
			items={updatedItems}
			paramName="cuisine"
		/>
	);
}
