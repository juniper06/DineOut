import { getReservationsByUser } from "@/app/action";
import Pagination from "@/components/Pagination";
import Reservations from "@/components/Reservations";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getUserCookie } from "@/lib/cookies";
import React from "react";

type SearchParams = {
  page: number;
}


export default async function MyReservations({ searchParams }: { searchParams: SearchParams}) {
  const user = await getUserCookie();
  const page = Number(searchParams.page) || 1;
  const paginated: PaginatedReservation = await getReservationsByUser(
    user?.userDetails?.id,
    page - 1
  );
	return (
		<ScrollArea className="col-span-8 bg-cornsilk-500 rounded-3xl row-span-3 relative px-10 pb-4">
			<h1 className="text-center p-5 text-4xl font-bold">RESERVATIONS</h1>
			<Separator className="bg-orange-500 h-1" />
			<Reservations reservations={paginated.content}/>
      <Pagination
				totalPages={paginated.totalPages}
				page={page}
			/>
		</ScrollArea>
	);
}
