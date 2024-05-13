import ProfileNav from "@/components/ProfileNav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getUserCookie } from "@/lib/cookies";
import React from "react";

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = await getUserCookie();

	return (
		<div className="h-screen pt-[140px] bg-orange-500">
			<div className="container h-full py-10 grid grid-cols-12 gap-x-12 grid-rows-3">
				<div className="col-span-4 rounded-3xl bg-cornsilk-500 flex flex-col px-4 row-span-3">
					<div className="flex flex-col items-center justify-center gap-y-2 flex-1">
						<Avatar className="w-48 h-48">
							<AvatarImage
								src={
									user.userDetails?.image
										? `http://localhost:8080/api/images/${user.userDetails?.image}`
										: `https://ui-avatars.com/api/?background=random&name=${user.userDetails?.name}`
								}
								alt="Profile Picture"
							/>
							<AvatarFallback>{user.userDetails?.name}</AvatarFallback>
						</Avatar>
						<h1 className="text-2xl font-extrabold capitalize">
							{user.userDetails?.name}
						</h1>
						<p className="font-semibold text-gray-400">
							{user.userDetails?.email}
						</p>
					</div>
					<Separator className="w-full h-1 bg-orange-500" />
					<div className="flex flex-col flex-1 gap-y-10 py-4">
						<ProfileNav />
					</div>
				</div>
				{children}
			</div>
		</div>
	);
}
