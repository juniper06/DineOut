import { cn } from "@/lib/utils";
import React from "react";

export default function Footer({ className }: { className?: string }) {
	return (
		<div
			className={cn(
				"flex flex-col items-center bg-red-500 w-full py-5",
				className
			)}>
			<h3 className="text-white font-semibold">DineOut</h3>
			<p className="text-slate-300">Copyright &copy; 2023 DineOut, Inc</p>
		</div>
	);
}
