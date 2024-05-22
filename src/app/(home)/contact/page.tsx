import Image from "next/image";
import React from "react";
import ContactImage from "@/assets/image/contact.png";
import Footer from "@/components/Footer";
import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactUsPage() {
	return (
		<div className="h-screen pt-[140px] flex flex-col justify-between items-center">
			<div className="container h-full flex items-center justify-center py-20">
				<div className="grid grid-cols-6 max-w-[1000px] rounded-3xl overflow-hidden h-full shadow-md drop-shadow-lg">
					<div className="col-span-4 bg-orange-500 py-4 px-16 flex flex-col gap-y-5">
						<h1 className="text-center font-bold text-4xl">Contact Us</h1>
						<p className="text-center">
							Connect with our team and let us assist you with any inquiries or
							assistance you need. We're here to support you every step of the
							way.
						</p>
            <div className="grid grid-cols-2 gap-x-5">
              <Input placeholder="Firstname" />
              <Input placeholder="Lastname"/>
            </div>
            <Input placeholder="Enter Email"/>
            <Textarea rows={5} placeholder="What can we help with?"/>
            <Button variant="primary" className="flex w-fit px-10">Send</Button>
					</div>
					<div className="col-span-2 flex items-center overflow-hidden justify-center bg-white">
						<Image
							alt="Contact Image"
							src={ContactImage}
							width={448}
							height={425}
							className="object-contain h-[350px] max-w-[350px]"
						/>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
