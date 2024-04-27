import { AuthProvider } from "@/components/hooks/useAuth";
import { TooltipProvider } from "@/components/ui/tooltip";
import React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<AuthProvider>
			<TooltipProvider delayDuration={0}>{children}</TooltipProvider>
		</AuthProvider>
	);
}
