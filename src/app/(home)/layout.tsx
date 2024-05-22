
import Navbar from "@/components/Navbar";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
	return (
		<main className="flex min-h-screen flex-col">
			<Navbar />
			{children}
		</main>
	);
}
