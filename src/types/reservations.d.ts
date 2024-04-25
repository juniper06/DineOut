type Tag = {
  id: number;
  name: string;
};

type RestaurantType = {
  id: number;
  name: string;
};

type Cuisine = {
  id: number;
  name: string;
};

type Restaurant = {
  id: number;
  name: string;
  description: string;
  serviceHours: string;
  address: string;
  tags: Tag[];
  type: RestaurantType;
  cuisine: Cuisine;
  images: string[]; // Assuming these are URLs to images
  ratings: number;
};

type User = {
  id: number;
  username: string;
  name: string;
  email: string;
  image: string | null; // Assuming it's a URL to the image or null
  role: string;
  enabled: boolean;
  authorities: { authority: string }[];
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  accountNonExpired: boolean;
};

type Reservation = {
  id: number;
  reservationDate: number;
  reservationTime: string | null;
  note: string | null;
  countPeople: number | null;
  cancelled: boolean;
  restaurant: Restaurant;
  user: User;
};

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

type PaginatedReservation = {
  content: Reservation[];
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
