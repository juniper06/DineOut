import EditProfileDialog from "@/components/EditProfileDialog";
import { Separator } from "@/components/ui/separator";
import { getUserCookie } from "@/lib/cookies";
import React from "react";

export default async function Profile() {
	const user = await getUserCookie();
	return (
		<div className="col-span-8 bg-cornsilk-500 rounded-3xl row-span-2 relative">
			<div className="w-full px-10">
				<h1 className="text-center p-5 text-4xl font-bold">PROFILE</h1>
				<Separator className="bg-orange-500 h-1" />
				<div className="flex flex-col py-16 gap-y-16 relative">
					<div className="flex">
						<h1 className="w-48 text-2xl font-bold">Username</h1>
						<h3 className="text-xl text-gray-500">
							{user.userDetails?.username}
						</h3>
					</div>
					<div className="flex">
						<h1 className="w-48 text-2xl font-bold">Name</h1>
						<h3 className="text-xl text-gray-500 capitalize">
							{user.userDetails?.name}
						</h3>
					</div>
					<div className="flex">
						<h1 className="w-48 text-2xl font-bold">Email</h1>
						<h3 className="text-xl text-gray-500">{user.userDetails?.email}</h3>
					</div>
				</div>
				<EditProfileDialog />
			</div>
		</div>
	);
}
