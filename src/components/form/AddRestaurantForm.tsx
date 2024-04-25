"use client";
import { addRestaurant } from "@/app/action";
import { CuisineField } from "@/components/CuisineField";
import { TagField } from "@/components/TagField";
import { TypeField } from "@/components/TypeField";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	name: z.string().min(1).max(120),
	description: z.string().min(1),
	serviceHours: z.string(),
	location: z.string(),
	tags: z.array(z.number()).nullable(),
	type: z.number().nullable(),
	cuisine: z.number().nullable(),
});

export type FormSchema = z.infer<typeof formSchema>;

export type ItemType = {
	id: number;
	name: string;
};

export default function AddRestaurantForm({
	closeDialog,
}: {
	closeDialog: () => void;
}) {
	const { toast } = useToast();
	const [files, setFiles] = React.useState<FileList | null>(null);
	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			description: "",
			serviceHours: "",
			location: "",
			tags: null,
			type: null,
			cuisine: null,
		},
	});
	const onSubmit = async (values: FormSchema) => {
		const formData = new FormData();
		if (files) {
			for (let i = 0; i < files.length; i++) {
				formData.append("images", files[i]);
			}
		}
		formData.append("restaurant", JSON.stringify(values));
		await addRestaurant(formData)
			.then(() => {
				toast({
					title: "Successfully Added",
					description: "New restaurant added to discover",
					variant: "success",
				});
			})
			.catch(e => {
				toast({
					title: "Something's wrong",
					description: e.message,
					variant: "destructive",
				});
			})
			.finally(() => {
				closeDialog();
			});
	};

	const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setFiles(e.target.files);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid gap-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Restaurant Name</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="Enter restaurant name"
									className="col-span-3"
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									rows={5}
									placeholder="Enter description of restaurant"
									className="resize-none"
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="serviceHours"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Service Hours</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="e.g Open: 03:30AM - Closes: 05:00PM"
									className="col-span-3"
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="location"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Location</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="e.g Cebu City, Cebu"
									className="col-span-3"
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<TagField form={form} />
				<TypeField form={form} />
				<CuisineField form={form} />

				<FormItem>
					<FormLabel>Images</FormLabel>
					<FormControl>
						<Input
							accept="image/*"
							onChange={imageChange}
							multiple
							type="file"
							className="col-span-3"
						/>
					</FormControl>
				</FormItem>

				<Button
					type="submit"
					variant="primary">
					Add Restaurant
				</Button>
			</form>
		</Form>
	);
}
