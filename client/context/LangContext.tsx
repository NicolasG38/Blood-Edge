"use client";
import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

type LangType = "fr" | "en";

interface LanguageContextProps {
	lang: LangType;
	setLang: (lang: LangType) => void;
}

const LanguageContext = createContext<LanguageContextProps>({
	lang: "en",
	setLang: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [lang, setLang] = useState<LangType>("en");

	useEffect(() => {
		// Détection via navigateur
		const browserLang = navigator.language || navigator.languages?.[0] || "en";
		if (browserLang.startsWith("fr")) setLang("fr");
		else setLang("en");
	}, []);

	return (
		<LanguageContext.Provider value={{ lang, setLang }}>
			{children}
		</LanguageContext.Provider>
	);
};
