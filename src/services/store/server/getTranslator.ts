import { getTranslator, getMessages } from "next-intl/server";
import { getCurrentStoreLocale } from "./getCurrentStoreLocale";

export const getStoreTranslator = async (store: string, namespace?: any) => {
	const locale = getCurrentStoreLocale(store);
	return await getTranslator(locale, namespace);
};
