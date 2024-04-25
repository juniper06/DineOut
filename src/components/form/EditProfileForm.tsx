"use client";
import { updateUser } from "@/app/action";
import useAuth from "@/components/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	username: z.string(),
	name: z.string(),
	email: z.string(),
	password: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export default function EditProfileForm({
	closeDialog,
}: {
	closeDialog: () => void;
}) {
	const { toast } = useToast();
	const { user, onLogin } = useAuth();
	const [file, setFile] = React.useState<File | undefined>(undefined);
	const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: FormData) => {
		const formData = new FormData();
		formData.append("image", file as File);
		formData.append("user", JSON.stringify(data));
		const responseData = await updateUser(formData, user?.userDetails?.id);
		onLogin(responseData);
		if (responseData.message)
			toast({
				variant: "destructive",
				title: responseData.message,
				description: "Please try again",
				className: "top-0",
			});
		else
			toast({
				variant: "success",
				title: "Successfully Updated",
				description: "Your changes have been applied.",
				className: "top-0",
			});
		closeDialog();
	};

	const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const selectedFile = e.target.files[0];
			setFile(selectedFile);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid gap-4 py-4">
				<FormItem className="grid grid-cols-4 items-center gap-4">
					<FormLabel>
						<Avatar className="w-16 h-16">
							<AvatarImage
								src={
									file
										? URL.createObjectURL(file)
										: `http://localhost:8080/api/images/${user.userDetails?.image}`
								}
								alt="Profile Picture"
							/>
							<AvatarFallback>{user.userDetails?.username}</AvatarFallback>
						</Avatar>
					</FormLabel>
					<FormControl>
						<Input
							accept="image/*"
							onChange={imageChange}
							type="file"
							className="col-span-3"
						/>
					</FormControl>
				</FormItem>

				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem className="grid grid-cols-4 items-center gap-4">
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input
									placeholder={user.userDetails?.username}
									{...field}
									className="col-span-3"
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="grid grid-cols-4 items-center gap-4">
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									placeholder={user.userDetails?.name}
									{...field}
									className="capitalize col-span-3"
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem className="grid grid-cols-4 items-center gap-4">
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									type="email"
									placeholder={user.userDetails?.email}
									{...field}
									className="col-span-3"
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem className="grid grid-cols-4 items-center gap-4">
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="*****"
									{...field}
									className="col-span-3"
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					variant="primary">
					Submit
				</Button>
			</form>
		</Form>
	);
}
