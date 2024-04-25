import { useReducer } from "react";

export type ReservationState = {
	reservationDate: Date | undefined;
	reservationTime: string;
	note: string;
  people: number;
};

export type ReservationAction =
	| { type: "DATE"; payload: Date | undefined }
	| { type: "TIME"; payload: string }
	| { type: "NOTE"; payload: string }
	| { type: "PEOPLE"; payload: number };

export const reservationReducer = (
	state: ReservationState,
	action: ReservationAction
): ReservationState => {
	switch (action.type) {
		case "DATE":
			return { ...state, reservationDate: action.payload };
		case "TIME":
			return { ...state, reservationTime: action.payload };
		case "NOTE":
			return { ...state, note: action.payload };
		case "PEOPLE":
			return { ...state, people: action.payload };
	}
};

const getDefaultReservationTime = () => {
	const date = new Date();
	return `${date.getHours() % 12}AM - ${date.getHours() % 12}AM`;
};

export default function useReservation() {
	const initialState: ReservationState = {
		reservationDate: new Date(),
		reservationTime: getDefaultReservationTime(),
		note: "",
    people: 1
	};

	return useReducer(reservationReducer, initialState);
}
