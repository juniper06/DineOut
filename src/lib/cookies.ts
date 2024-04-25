"use server";

import { User, defaultUserValue } from "@/components/hooks/useAuth";
import { cookies } from "next/headers";

export async function getUserCookie(): Promise<User> {
	const user = cookies().get("user")?.value;
	if (user) {
		return JSON.parse(user) as User;
	}
	return defaultUserValue;
}

export async function setUserCookie(user: User) {
	cookies().set("user", JSON.stringify(user));
}

export async function removeUserCookie() {
	cookies().delete("user");
}
