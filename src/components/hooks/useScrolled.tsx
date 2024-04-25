"use client";
import React from "react";

export default function useScrolled() {
	const [isScrolled, setIsScrolled] = React.useState(false);

	React.useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY;
			if (scrollPosition > 0) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return isScrolled;
}
 