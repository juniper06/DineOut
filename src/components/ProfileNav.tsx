"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaUser } from "react-icons/fa";
import { ImSpoonKnife } from "react-icons/im";
import { MdOutlineStar } from "react-icons/md";

const items = [
	{
		name: "PROFILE",
		href: "/profile",
		icon: <FaUser />,
	},
	{
		name: "RESERVATIONS",
		href: "/profile/reservations",
		icon: <ImSpoonKnife />,
	},
	{
		name: "REVIEWS MADE",
		href: "/profile/reviews",
		icon: <MdOutlineStar />,
	},
];

export default function ProfileNav() {
	const pathName = usePathname();
	return (
		<>
			{items.map(item => (
				<Link href={item.href} key={item.href}>
					<div
						key={item.name}
						className="flex gap-x-2 text-gray-400 text-xl items-center">
						{item.icon}
						<h3
							className={cn(
								"font-extrabold",
								item.href === pathName && "text-black font-extrabold"
							)}>
							{item.name}
						</h3>
					</div>
				</Link>
			))}
		</>
	);
}
