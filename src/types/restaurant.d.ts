type Restaurant = {
	id: number;
	name: string;
	description: string;
	serviceHours: string;
	tags: any[];
	type: any;
	cuisine: any;
	images: any[];
	ratings: number;
  address: string;
};



type ApiResponse = {
	content: Restaurant[];
	pageable: Pageable;
	last: boolean;
	totalPages: number;
	totalElements: number;
	numberOfElements: number;
	first: boolean;
	size: number;
	number: number;
	sort: {
		empty: boolean;
		sorted: boolean;
		unsorted: boolean;
	};
	empty: boolean;
};

type RestaurantQuery = {
	tags?: string[] | undefined;
	ratings?: string | undefined;
	cuisine?: string | undefined;
	type?: string | undefined;
	page?: string | undefined;
  search?: string | undefined;
};
