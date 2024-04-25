"use client";
import useAuth from "@/components/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

export default function ProfilePicture() {
	const { user } = useAuth();

	return (
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
	);
}
