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
					<form
						action="/discover"
						className="flex gap-2">
						<div className="flex rounded-full h-12 w-72 bg-white overflow-hidden items-center px-4 gap-4">
							<Search className="text-[#ff645a]" />
							<input
								type="text"
								placeholder="Find Restaurant"
								className="bg-inherit focus:outline-none"
								name="search"
							/>
						</div>
						<button
							type="submit"
							className="font-bold bg-[#ff645a] p-3 px-8 text-white rounded-full tracking-wider">
							Search
						</button>
					</form>
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
