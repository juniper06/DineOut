import { SearchParams } from "@/app/(home)/discover/page";
import { getRestaurants } from "@/app/action";
import AddRestaurantButton from "@/components/AddRestaurantButton";
import Footer from "@/components/Footer";
import Pagination from "@/components/Pagination";
import RestaurantsTable from "@/components/RestaurantsTable";
import ToExport from "@/components/ToExport";
import { Button } from "@/components/ui/button";
import React from "react";

export default async function DashboardPage({ searchParams }: SearchParams) {
	const paginated: ApiResponse = await getRestaurants(searchParams || {});
	const restaurants = paginated.content;

	return (
		<div className="min-h-screen pt-[140px] flex flex-col bg-orange-500">
			<ToExport restaurants={restaurants} />
			<div className="bg-orange-500">
				<Pagination
					totalPages={paginated.totalPages}
					page={Number(searchParams?.page) || 1}
				/>
			</div>
			<Footer />
		</div>
	);
}
