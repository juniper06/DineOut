"use client";
import React from "react";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import useAuth from "@/components/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
	username: z.string().min(1, {
		message: "Username must required!",
	}),
	password: z.string().min(1, {
		message: "Password must required!",
	}),
});

type formSchemaType = z.infer<typeof formSchema>;

export default function LoginForm() {
	const { toast } = useToast();
	const { onLogin } = useAuth();
	const router = useRouter();

	const form = useForm<formSchemaType>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const onSubmit = async (values: formSchemaType) => {
		const response = await fetch("http://localhost:8080/auth/login", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				username: values.username,
				password: values.password,
			}),
		});
		const data = await response.json();
    if (response.status === 403) {
      console.log("hello world")
			form.setError("username", {type: "validate", message: data.message});
			return;
		}
		if (response.status != 200) {
			toast({
				variant: "destructive",
				title: data.message,
				description: "Please try again",
				className: "top-0",
			});
			return;
		}
		onLogin(data);
		router.push("/");
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col w-3/4 gap-5 pt-7">
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter Username"
									className="h-14 border-2 border-gray-200 focus-visible:ring-offset-0 focus-visible:ring-red-300"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="Enter Password"
									className="h-14 border-2 border-gray-200 focus-visible:ring-offset-0 focus-visible:ring-red-300"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
          disabled={form.formState.isSubmitting}
					variant="primary"
					className="h-14 text-xl font-light"
					type="submit">
					Sign In
				</Button>
			</form>
		</Form>
	);
}
