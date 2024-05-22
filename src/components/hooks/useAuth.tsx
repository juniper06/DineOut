"use client";
import React, {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { getUserCookie, removeUserCookie, setUserCookie } from "@/lib/cookies";
import { usePathname, useRouter } from "next/navigation";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export enum Role {
	USER = "USER",
	ADMIN = "ADMIN",
}

type Authority = {
	authority: Role;
};

export type UserDetails = {
	id?: number;
	username?: string;
	name?: string;
	email?: string;
	image?: string;
	role?: Role;
	enabled?: true;
	authorities?: Authority[];
	credentialsNonExpired?: boolean;
	accountNonExpired?: boolean;
	accountNonLocked?: boolean;
};

export type User = {
	userDetails?: UserDetails | null;
	token?: string | null;
	isAuthenticated?: boolean;
};

type AuthProviderProps = {
	children: ReactNode;
};

export type AuthContextType = {
	user: User;
	onLogin: (user: User) => Promise<void>;
	onLogout: () => Promise<void>;
	isLoading: boolean;
};

export const defaultUserValue = {
	userDetails: null,
	token: null,
	isAuthenticated: false,
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<User>(defaultUserValue);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { push } = useRouter();
	const pathName = usePathname();

	useEffect(() => {
		const updateUser = async () => {
			const cookiesUser = await getUserCookie();
			if (!cookiesUser.isAuthenticated) {
				onLogout();
			}
			setUser(cookiesUser);
			setIsLoading(false);
		};
		updateUser();
	}, []);

	useEffect(() => {
		if (
			!user.isAuthenticated &&
			["/dashboard", "/profile"].includes(pathName) &&
			!isLoading
		) {
			push("/");
		}
	}, [user.isAuthenticated, isLoading]);

	const onLogin = React.useCallback(
		async ({ userDetails, token }: User) => {
			const newUser: User = { userDetails, token, isAuthenticated: true };
			setUser(newUser);
			await setUserCookie(newUser);
		},
		[user.isAuthenticated]
	);

	const onLogout = React.useCallback(async () => {
		setIsLoading(true);
		await removeUserCookie();
		setUser(defaultUserValue);
		setIsLoading(false);
	}, []);

	const value: AuthContextType = { user, onLogin, onLogout, isLoading };
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default function useAuth(): AuthContextType {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
