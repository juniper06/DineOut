import React from "react";
import { Roboto_Slab } from "next/font/google";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import RegisterForm from "@/components/form/RegisterForm";

const roboto_slab = Roboto_Slab({ subsets: ["latin"] });

export default function Register() {
	return (
		<div className="py-10 flex-1 bg-cornsilk-100 w-96 flex flex-col items-center">
			<h1 className={cn("text-4xl font-bold", roboto_slab.className)}>Register</h1>
			<p className={cn("mb-5", roboto_slab)}>Welcome to DineOut</p>
			<RegisterForm />
			<div className="mt-2 flex items-center justify-center gap-5">
				<Separator className="h-[1px] bg-black" />
				<p>Or</p>
				<Separator className="h-[1px] bg-black" />
			</div>
			<Button
				asChild
				variant="link"
				className="underline">
				<Link href="/login">Already have an account</Link>
			</Button>
		</div>
	);
}
