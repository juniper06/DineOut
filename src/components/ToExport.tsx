"use client";
import AddRestaurantButton from "@/components/AddRestaurantButton";
import RestaurantsTable from "@/components/RestaurantsTable";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const ToExport = ({ restaurants }: { restaurants: Restaurant[] }) => {
	const containerExport = useRef(null);

	return (
		<div
			className="container flex flex-col h-full flex-1"
			ref={containerExport}>
			<h1 className="text-white text-4xl text-center font-bold">
				Restaurant Dashboard
			</h1>
			<div className="flex justify-between">
				<AddRestaurantButton />
			</div>
			<RestaurantsTable restaurants={restaurants} />
		</div>
	);
};

export default ToExport;
