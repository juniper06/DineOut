import React from "react";
import { Roboto_Slab } from "next/font/google";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import LoginForm from "@/components/form/LoginForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const roboto_slab = Roboto_Slab({ subsets: ["latin"] });

export default function Login() {
	return (
		<div className="py-10 flex-1 bg-cornsilk-100 sm:w-96 w-screen flex flex-col items-center">
			<h1 className={cn("text-4xl font-bold", roboto_slab.className)}>Login</h1>
			<p className={cn("mb-5", roboto_slab)}>Welcome to DineOut</p>
			<LoginForm/>
			<div className="my-7 flex items-center justify-center gap-5">
				<Separator className="h-[1px] bg-black" />
				<p>Or</p>
				<Separator className="h-[1px] bg-black" />
			</div>
			<Button
				asChild
				variant="link"
				className="underline">
				<Link href="/register">Create an account</Link>
			</Button>
		</div>
	);
}
