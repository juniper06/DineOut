"use client";
import Image from "next/image";
import React from "react";
import Logo from "@/assets/image/logo.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "../lib/utils";
import useAuth from "@/components/hooks/useAuth";
import { Loader } from "lucide-react";
import ProfileMenu from "@/components/ProfileMenu";
import useScrolled from "@/components/hooks/useScrolled";
import { usePathname } from "next/navigation";
import Randomizer from "@/components/Randomizer";
import SearchInput from "@/components/SearchInput";

export default function Navbar() {
	const { user, isLoading } = useAuth();
	const isScrolled = useScrolled();

	return (
		<header
			className={cn(
				"w-screen fixed top-0 left-0 bg-orange-500 flex justify-center h-[140px] z-10",
				isScrolled && "shadow-lg transition duration-300 ease-in-out"
			)}>
			<div className="container flex justify-between">
				<div className="flex gap-5 items-center py-8">
					<Image
						src={Logo}
						alt="DineOut Logo"
						width={200}
						priority
					/>

					<NavItems />
				</div>

				<div className="flex gap-5 items-center">
					<Randomizer />
					<SearchInput />
					{!isLoading ? (
						user.isAuthenticated ? (
							<ProfileMenu />
						) : (
							<>
								<Button
									className="text-white font-bold tracking-wider"
									variant="link"
									asChild>
									<Link href="/login">Login</Link>
								</Button>
								<Button
									asChild
									className="font-bold bg-red-500 p-3 px-5 text-white rounded-md tracking-wider hover:bg-red-400">
									<Link href="/register">Register</Link>
								</Button>
							</>
						)
					) : (
						<Loader className="animate-spin text-white" />
					)}
				</div>
			</div>
		</header>
	);
}

const items = [
	{
		name: "Home",
		href: "/",
		value: "home",
	},
	{
		name: "Discover",
		href: "/discover",
		value: "discover",
	},
	{
		name: "About Us",
		href: "/about",
		value: "aboutUs",
	},
	{
		name: "Contact Us",
		href: "/contact",
		value: "contactUs",
	},
];

export function NavItems() {
	const pathName = usePathname();
	return (
		<>
			{items.map(item => (
				<Button
					key={item.value}
					className={cn(
						"text-white font-bold tracking-wider bg-transparent",
						pathName === item.href && "underline"
					)}
					variant="link"
					asChild>
					<Link
						href={item.href}
						className="font-roboto font-bold text-white tracking-wider">
						{item.name}
					</Link>
				</Button>
			))}
		</>
	);
}
