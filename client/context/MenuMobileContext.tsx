"use client";
import { createContext, useContext, useState } from "react";

export const MenuMobileContext = createContext<
	| {
			openMenu: boolean;
			setOpenMenu: (v: boolean) => void;
	  }
	| undefined
>(undefined);

export function MenuMobileProvider({
	children,
}: { children: React.ReactNode }) {
	const [openMenu, setOpenMenu] = useState(false);
	return (
		<MenuMobileContext.Provider value={{ openMenu, setOpenMenu }}>
			{children}
		</MenuMobileContext.Provider>
	);
}

export function useMenuMobile() {
	const ctx = useContext(MenuMobileContext);
	if (!ctx)
		throw new Error(
			"useMenuMobile doit être utilisé dans <MenuMobileProvider>",
		);
	return ctx;
}

export default MenuMobileProvider;
