import Image from "next/image";
import FoodImage from "@/assets/image/food.png";
import SloganImage from "@/assets/image/slogan.png";
import { Search } from "lucide-react";
import Footer from "@/components/Footer";

export default function Home() {
	return (
		<div className="h-screen pt-[140px] bg-orange-500">
			<div className="flex container">
				<div className="flex-1 flex flex-col gap-4 pt-28 items-center pr-40">
					<Image
						src={SloganImage}
						alt="Sloga image"
						className="object-contain"
					/>
					<p className="text-white font-semibold w-96">
						Stuck on where to eat?
						<span className="text-[#ff645a]"> DineOut</span> recommends the
						perfect places to satisfy all your cravings
					</p>
				</div>
				<div className="flex-1 relative">
					<Image
						alt="Foods"
						src={FoodImage}
						className="object-contain scale-150 absolute top-56 -left-36"
					/>
				</div>
			</div>
			<Footer className="absolute bottom-0" />
		</div>
	);
}
