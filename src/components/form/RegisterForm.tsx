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
	FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { FaCheckCircle } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";

const formSchema = z
	.object({
		username: z.string().min(1, {
			message: "Username must required!",
		}),
		firstName: z.string().min(1, {
			message: "Name must required!",
		}),
		lastName: z.string().min(1, {
			message: "Name must required!",
		}),
		gender: z.string().min(1, {
			message: "Must select a gender",
		}),
		password: z
			.string()
			.min(8, {
				message: "Password must have minimum of 8 characters",
			})
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/, {
				message:
					"Must atleast one lowercase and uppercase characters with special charater/s",
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
	const { toast } = useToast();
	const [step, setStep] = React.useState(1);

	const form = useForm<formSchemaType>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			firstName: "",
			lastName: "",
			gender: "",
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
				firstName: values.firstName,
				lastName: values.lastName,
			}),
		});
		if (response.status === 409) {
			const data = await response.json();
			form.setError("username", { type: "value", message: data.message });
			return;
		}
		if (response.status != 200) {
			const data = await response.json();
			toast({
				variant: "destructive",
				title: data.message,
				description: "Please try again",
				className: "top-0",
			});
			return;
		}
		router.push("/login");
	};

	const onNextStep = async () => {
		const isValid = await form.trigger(["firstName", "lastName", "gender"]);
		if (isValid) {
			setStep(2);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col w-3/4 gap-3 min-h-[400px]">
				<Stepper currentStep={step} />
				{step === 1 && (
					<>
						<FormField
							control={form.control}
							name="firstName"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											placeholder="Enter Your First Name"
											className="capitalize h-14 border-2 border-gray-200 focus-visible:ring-offset-0 focus-visible:ring-red-300"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="lastName"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											placeholder="Enter Your Last Name"
											className="capitalize h-14 border-2 border-gray-200 focus-visible:ring-offset-0 focus-visible:ring-red-300"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="gender"
							render={({ field }) => (
								<FormItem>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select a gender" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="MALE">Male</SelectItem>
											<SelectItem value="FEMALE">Female</SelectItem>
											<SelectItem value="OTHER">Other</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							onClick={onNextStep}
							variant="primary"
							type="button"
							className="text-xl font-light">
							Next
						</Button>
					</>
				)}

				{step === 2 && (
					<>
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
									<FormMessage />
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
									<FormMessage />
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
									<FormMessage />
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
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex justify-between w-full">
							<Button
								onClick={() => setStep(1)}
								variant="link"
								className="text-lg font-light ps-0"
								type="submit">
								<ChevronLeft/>
								Previous
							</Button>
							<Button
								disabled={form.formState.isSubmitting}
								variant="primary"
								className="text-lg font-light"
								type="submit">
								Create account
							</Button>
						</div>
					</>
				)}
			</form>
		</Form>
	);
}

function Stepper({ currentStep }: { currentStep: number }) {
	return (
		<div className="flex">
			<div className="flex gap-2 items-center">
				<p
					className={cn(
						"rounded-full w-7 h-7 text-center bg-green-50",
						currentStep === 1 && "border-2 border-green-500"
					)}>
					{currentStep === 2 ? (
						<FaCheckCircle className="h-7 w-7 text-green-500 transition-all duration-300" />
					) : (
						1
					)}
				</p>
				<h1>Information</h1>
			</div>
			<div className="flex items-center w-full">
				<Separator
					orientation="horizontal"
					className="col-span-1"
				/>
			</div>
			<div className="flex gap-2 items-center">
				<p
					className={cn(
						"rounded-full w-7 h-7 text-center bg-gray-200 ",
						currentStep === 2 && "border-2 border-green-500 bg-green-50"
					)}>
					2
				</p>
				<h1>Authentication</h1>
			</div>
		</div>
	);
}
