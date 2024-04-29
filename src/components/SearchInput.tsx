import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

export default function SearchInput() {
	const pathName = usePathname();
	if (pathName === "/") {
		return null;
	}
	return (
		<div className="flex relative h-full items-center">
			<SearchIcon className="absolute ms-2 text-[#ff645a]" />
			<form action="/discover">
				<Input
					className="ps-10"
					type="search"
          name="search"
					placeholder="Location, Restaurant ..."
				/>
			</form>
		</div>
	);
}
