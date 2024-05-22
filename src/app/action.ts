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

	const response = await fetch(
		`http://localhost:8080/api/restaurants?${params.toString()}`,
		{
			method: "GET",
			next: {
				tags: ["restaurants"],
				revalidate: 3600,
			},
		}
	);

	if (!response.ok) {
		throw new Error("Failed to fetch data");
	}

	return response.json();
}

export async function getRestaurant(id: number): Promise<Restaurant> {
	const response = await fetch(`http://localhost:8080/api/restaurants/${id}`, {
		method: "GET",
    cache: "no-cache"
	});
	return response.json();
}

export type Review = {
	id: number;
	rating: number;
	comment: string;
	date: string;
	restaurant: Restaurant;
	user: UserDetails;
};

export async function getReviewsByRestaurantId(id: number) {
	const response = await fetch(
		`http://localhost:8080/api/restaurants/${id}/reviews`,
		{
			method: "GET",
      next: {
        tags: ["reviews"],
        revalidate: 3600
      }
		}
	);
	if (!response.ok) {
		throw new Error("Failed to fetch data");
	}
	return response.json();
}

export type AddReviewProps = {
	rating?: number;
	comment?: string;
	userId?: number;
};

export async function addReviews(id: number, props: AddReviewProps) {
	const response = await fetch(
		`http://localhost:8080/api/restaurants/${id}/reviews`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				...props,
			}),
		}
	);
	if (!response.ok) {
		throw new Error("Failed to fetch data");
	}
	revalidateTag("reviews")
	revalidateTag("reviews-made")
	return response.json();
}

export type ReservationProps = {
	restaurantId: number;
	userId?: number;
	reservationDate: Date | undefined;
	note: string;
	reservationTime: string;
	countPeople: number;
};

export async function addReservations(props: ReservationProps) {
	const response = await fetch(`http://localhost:8080/api/reservations`, {
		method: "POST",
		cache: "no-cache",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			...props,
		}),
	});
	if (!response.ok) {
		throw new Error("Failed to fetch data");
	}
  revalidateTag("cancel-reservation")
	return response.json();
}

export async function getReviewsByUserId(id: number | undefined, page: number) {
	const response = await fetch(
		`http://localhost:8080/api/users/${id}/reviews?page=${page}`,
		{
			method: "GET",
      next: {
        tags: ["reviews-made"],
        revalidate: 3600
      }
		}
	);
	if (!response.ok) {
		throw new Error("Failed to fetch data");
	}
	return response.json();
}

export async function getRandomRestaurant() {
	const response = await fetch("http://localhost:8080/api/restaurants/random", {
		method: "GET",
		cache: "no-cache",
	});
	if (!response.ok) {
		throw new Error("Failed to fetch data");
	}
	return await response.json();
}

export async function getReservationsByUser(
	userId: number | undefined,
	page: number
) {
	const response = await fetch(
		`http://localhost:8080/api/users/${userId}/reservations?page=${page}`,
		{
			method: "GET",
      next: {
        tags: ["cancel-reservation"],
        revalidate: 3600
      }
		}
	);
	if (!response.ok) {
		throw new Error("Failed to fetch data");
	}
	return await response.json();
}

export async function cancelReservation(reservationId: number) {
	const response = await fetch(
		`http://localhost:8080/api/reservations/${reservationId}/cancel`,
		{
			method: "PUT",
		}
	);
	if (!response.ok) {
		throw new Error("Failed to fetch data");
	}
	revalidateTag("cancel-reservation");
}

export async function updateUser(
	formData: FormData,
	userId: number | undefined
) {
	const response = await fetch(`http://localhost:8080/auth/${userId}/user`, {
		method: "PUT",
		body: formData,
	});
	if (!response.ok) {
		throw new Error("Failed to fetch data");
	}
	revalidatePath("/");
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
	revalidateTag("restaurants");
	return response.json();
}

export async function deleteReviewById(reviewId: number) {
	const response = await fetch(
		`http://localhost:8080/api/reviews/${reviewId}`,
		{
			method: "DELETE",
		}
	);
	if (!response.ok) {
		throw new Error("Failed to fetch data");
	}
	revalidateTag("reviews");
  revalidateTag("reviews-made")
}

export async function updateReview(
	id: number,
	comment: string,
	rating: number
) {
	const response = await fetch(`http://localhost:8080/api/reviews/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			comment,
			rating,
		}),
	});
	if (!response.ok) {
		throw new Error("Failed to fetch data");
	}
	revalidateTag("reviews");
	revalidateTag("reviews-made");
	return response.json();
}

export async function getRecommendedRestaurants() {
	const response = await fetch(
		`http://localhost:8080/api/restaurants/recommended`,
		{
			method: "GET",
			cache: "no-cache",
		}
	);
	if (!response.ok) {
		throw new Error("Failed to fetch data");
	}
	return await response.json();
}

export async function deleteRestaurant(restaurantId: number) {
	const response = await fetch(
		`http://localhost:8080/api/restaurants/${restaurantId}`,
		{
			method: "DELETE",
		}
	);
	if (!response.ok) {
		throw new Error("Failed to fetch data");
	}
	revalidateTag("restaurants");
}

export async function updateRestaurant(
	restaurantId: number,
	formData: FormData
) {
	const response = await fetch(
		`http://localhost:8080/api/restaurants/${restaurantId}`,
		{
			method: "PUT",
			body: formData,
		}
	);
	if (!response.ok) {
		throw new Error("Failed to fetch data");
	}
	revalidateTag("restaurants");
  revalidatePath("/restaurant/[]", "page");
}
