"use client";

import useAuth from "@/components/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function UserDetails() {
	const { user, isLoading } = useAuth();

	if (isLoading) {
		return (
			<div className="flex flex-col py-16 gap-y-16 relative">
				<div className="flex">
					<h1 className="w-48 text-2xl font-bold">Username</h1>
					<Skeleton className="h-[28px] w-[250px] bg-orange-300" />
				</div>
				<div className="flex">
					<h1 className="w-48 text-2xl font-bold">Name</h1>
					<Skeleton className="h-[28px] w-[250px] bg-orange-300" />
				</div>
				<div className="flex">
					<h1 className="w-48 text-2xl font-bold">Email</h1>
					<Skeleton className="h-[28px] w-[250px] bg-orange-300" />
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col py-16 gap-y-16 relative">
			<div className="flex">
				<h1 className="w-48 text-2xl font-bold">Username</h1>
				<h3 className="text-xl text-gray-500">{user.userDetails?.username}</h3>
			</div>
			<div className="flex">
				<h1 className="w-48 text-2xl font-bold">Name</h1>
				<h3 className="text-xl text-gray-500 capitalize">{user.userDetails?.name}</h3>
			</div>
			<div className="flex">
				<h1 className="w-48 text-2xl font-bold">Email</h1>
				<h3 className="text-xl text-gray-500">{user.userDetails?.email}</h3>
			</div>
		</div>
	);
}
