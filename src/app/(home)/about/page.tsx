import React from "react";
import AlexaImage from "@/assets/image/alexa.jpg";
import EllaineImage from "@/assets/image/ellaine.jpg";
import EarlImage from "@/assets/image/earl.png";
import MJImage from "@/assets/image/mj.png";
import Image from "next/image";
import Footer from "@/components/Footer";

export default function AboutUsPage() {
	return (
		<div className="h-screen pt-[140px] flex flex-col justify-center items-center">
			<div className="container h-full w-full flex-1 flex flex-col gap-y-6 justify-center">
				<h1 className="text-center text-6xl font-bold">About Us</h1>
				<p className="text-center font-medium pb-10">
					We are a group of vibrant, student developers, driven by our love for
					food and <br /> innovation, and we&apos;re the creative minds behind
					DineOut—a revolutionary platform <br /> designed to simplify and
					elevate the dining experience.
				</p>
			</div>
			<div className="bg-orange-500 h-full w-full flex-1 relative">
				<div className="flex gap-x-8 absolute w-full -top-16 justify-center">
					<div className="rounded-xl shadow-lg bg-white">
						<Image
							src={AlexaImage}
							alt="Image 1"
							width={150}
							height={150}
							className="h-[150px] object-cover rounded-xl mx-8 mt-4"
						/>
						<div className="flex flex-col gap-y-2 my-4">
							<h1 className="text-center font-bold">
								Alexandra Mae C. Gabisay
							</h1>
							<h1 className="text-center font-medium">
								“You can never <br /> be overdressed or <br />
								overeducated”
							</h1>
						</div>
					</div>
					<div className="rounded-xl shadow-lg bg-white">
						<Image
							src={EllaineImage}
							alt="Image 1"
							width={150}
							height={150}
							className="h-[150px] object-cover rounded-xl mx-8 mt-4"
						/>
						<div className="flex flex-col gap-y-2 my-4">
							<h1 className="text-center font-bold">Ellaine Joyce A. Claro</h1>
							<h1 className="text-center pb-4 font-medium">
								"Life is like riding <br />a bicycle. To keep your <br />
								balance, you must <br />
								keep moving."
							</h1>
						</div>
					</div>
					<div className="rounded-xl shadow-lg bg-white max-w-full">
						<Image
							src={EarlImage}
							alt="Image 1"
							width={150}
							height={150}
							className="h-[150px] object-cover rounded-xl mx-8 mt-4"
						/>
						<div className="flex flex-col gap-y-2 my-4">
							<h1 className="text-center font-bold">Earl Nobe</h1>
							<p className="text-center font-medium">
								"Eat, Sleep, Code, <br />
								Repeat."
							</p>
						</div>
					</div>
					<div className="rounded-xl shadow-lg bg-white">
						<Image
							src={MJImage}
							alt="Image 1"
							width={150}
							height={150}
							className="h-[150px] object-cover rounded-xl mx-8 mt-4"
						/>
						<div className="flex flex-col gap-y-2 my-4">
							<h1 className="text-center font-bold">Mj Gaviola</h1>
							<h1 className="text-center font-medium">
								"Keep your nose out
								<br /> the sky, keep your heart <br /> to God, and keep your
								face <br />
								to the rising sun"
							</h1>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
