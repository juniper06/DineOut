import React from "react";
import AlexaImage from "@/assets/image/alexa.jpg";
import BiancaImage from "@/assets/image/bianca.jpg";
import EarlImage from "@/assets/image/earl.png";
import MJImage from "@/assets/image/mj.png";
import TejeroImage from "@/assets/image/tejero.png";
import BasImage from "@/assets/image/bas.jpg";
import GabrielImage from "@/assets/image/gab.png";
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
							src={BiancaImage}
							alt="Image 1"
							width={150}
							height={150}
							className="h-[150px] object-cover rounded-xl mx-8 mt-4"
						/>
						<div className="flex flex-col gap-y-2 my-4">
							<h1 className="text-center font-bold">Bhea Bianca Melicor</h1>
							<h1 className="text-center pb-4 font-medium">
								"When the sun shines, <br /> we'll shine together."
							</h1>
						</div>
					</div>
					<div className="rounded-xl shadow-lg bg-white max-w-full">
						<Image
							src={TejeroImage}
							alt="Image 1"
							width={150}
							height={150}
							className="h-[150px] object-cover rounded-xl mx-8 mt-4"
						/>
						<div className="flex flex-col gap-y-2 my-4">
							<h1 className="text-center font-bold">Mary Jessica Tejero</h1>
							<p className="text-center font-medium">
								"Bahala na si BATMAN."
							</p>
						</div>
					</div>
					<div className="rounded-xl shadow-lg bg-white max-w-full">
						<Image
							src={BasImage}
							alt="Image 1"
							width={150}
							height={150}
							className="h-[150px] object-cover rounded-xl mx-8 mt-4"
						/>
						<div className="flex flex-col gap-y-2 my-4">
							<h1 className="text-center font-bold">Jeuz Vinci Bas</h1>
							<p className="text-center font-medium">
								"I Believe I cant fly."
							</p>
						</div>
					</div>
					<div className="rounded-xl shadow-lg bg-white max-w-full">
						<Image
							src={GabrielImage}
							alt="Image 1"
							width={150}
							height={150}
							className="h-[150px] object-cover rounded-xl mx-8 mt-4"
						/>
						<div className="flex flex-col gap-y-2 my-4">
							<h1 className="text-center font-bold">Juniper Gabriel</h1>
							<p className="text-center font-medium">
								"Don't stop when you're tired <br/> Stop when you're done."
							</p>
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
							<h1 className="text-center font-bold">Juniper Gabriel</h1>
							<p className="text-center font-medium">
								"CODE.EAT.SLEEP. <br />REPEAT"
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
