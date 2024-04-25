"use server";
import { UserDetails } from "@/components/hooks/useAuth";
import { revalidatePath, revalidateTag } from "next/cache";

export async function getRestaurants(query: RestaurantQuery) {
	const page = Number(query.page) || 0;
	const params = new URLSearchParams({
		tags: Array.isArray(query.tags) ? query.tags.join(",") : query.tags || "",
		ratings: query.ratings || "",
		cuisine: query.cuisine || "",
		type: query.type || "",
		search: query.search || "",
		page: String(page - 1) || "",
	});

	const url = `http://localhost:8080/api/restaurants?${params.toString()}`;

	const response = await fetch(url, {
		method: "GET",
		cache: "no-cache",
	});

	if (!response.ok) {
		throw new Error("Failed to fetch data");
	}

	return response.json();
}

export async function getRestaurant(id: number): Promise<Restaurant> {
	const response = await fetch(`http://localhost:8080/api/restaurants/${id}`, {
		method: "GET",
		cache: "no-cache",
	});
	return response.json();
}


export async function getTags() {
	const response = await fetch(`http://localhost:8080/api/tags`, {
		method: "GET",
		next: {
			tags: ["tags"],
			revalidate: 3600,
		},
	});
	if (!response.ok) {
		throw new Error("Failed to fetch data");
	}
	return await response.json();
}

export async function getCuisines() {
	const response = await fetch(`http://localhost:8080/api/cuisine`, {
		method: "GET",
		next: {
			tags: ["cuisines"],
			revalidate: 3600,
		},
	});
	if (!response.ok) {
		throw new Error("Failed to fetch data");
	}
	return await response.json();
}

export async function getTypes() {
	const response = await fetch(`http://localhost:8080/api/types`, {
		method: "GET",
		next: {
			tags: ["types"],
			revalidate: 3600,
		},
	});
	if (!response.ok) {
		throw new Error("Failed to fetch data");
	}
	return await response.json();
}

export async function addRestaurant(formData: FormData) {
	const response = await fetch(`http://localhost:8080/api/restaurants`, {
		method: "POST",
		body: formData,
	});
	if (!response.ok) {
		throw new Error("Failed to fetch data");
	}
	revalidatePath("/discover");
	return response.json();
}
