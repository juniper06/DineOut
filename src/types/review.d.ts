type Restaurant = {
  id: number;
  name: string;
  description: string;
  serviceHours: string;
  address: string;
  tags: { id: number; name: string }[];
  type: { id: number; name: string };
  cuisine: { id: number; name: string };
  images: any[]; // You might want to define a specific type for images
}

type Review = {
  id: number;
  rating: number;
  comment: string;
  date: string;
  restaurant: Restaurant;
  user: User;
}

type Pageable = {
  pageNumber: number;
  pageSize: number;
  sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

type PaginatedReviews = {
  content: Review[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
  };
  empty: boolean;
}