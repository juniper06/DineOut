"use client";
import React from "react";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z
	.object({
		username: z.string().min(1, {
			message: "Username must required!",
		}),
		name: z.string().min(1, {
			message: "Name must required!",
		}),
		password: z.string().min(1, {
			message: "Password must required!",
		}),
		email: z.string().email({
			message: "Email is invalid",
		}),
		confirmPassword: z.string(),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "Password don't match",
		path: ["confirmPassword"],
	});

type formSchemaType = z.infer<typeof formSchema>;

export default function LoginForm() {
	const router = useRouter();
  const { toast } = useToast()

	const form = useForm<formSchemaType>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			name: "",
			password: "",
			email: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (values: formSchemaType) => {
		const response = await fetch("http://localhost:8080/auth/register", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				username: values.username,
				email: values.email,
				password: values.password,
				name: values.name,
			}),
		});
		if (response.status != 200) {
      const data = await response.json();
      toast({
        variant: "destructive",
        title: data.message,
        description: "Please try again",
        className: "top-0"
      })
			return;
		}
		router.push("/login");
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col w-3/4 gap-3">
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder="Enter Username"
									className="h-14 border-2 border-gray-200 focus-visible:ring-offset-0 focus-visible:ring-red-300"
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder="Enter Your Name (Optional)"
									className="capitalize h-14 border-2 border-gray-200 focus-visible:ring-offset-0 focus-visible:ring-red-300"
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									type="email"
									placeholder="Enter Email"
									className="h-14 border-2 border-gray-200 focus-visible:ring-offset-0 focus-visible:ring-red-300"
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									type="password"
									placeholder="Enter Password"
									className="h-14 border-2 border-gray-200 focus-visible:ring-offset-0 focus-visible:ring-red-300"
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									type="password"
									placeholder="Confirm Password"
									className="h-14 border-2 border-gray-200 focus-visible:ring-offset-0 focus-visible:ring-red-300"
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button
					variant="primary"
					className="h-14 text-xl font-light"
					type="submit">
					Create account
				</Button>
			</form>
		</Form>
	);
}
