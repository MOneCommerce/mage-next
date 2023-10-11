import { headers, cookies } from "next/headers";
import { cache } from "react";
import { COOKIE_STORE_CODE, HEADER_STORE_CODE } from "../share/constants";
import { getStoreFromHeader } from "./getStoreFromHeader";
import { getAvaliableStores } from "./getAvaliableStores";
import { getDefaultStore } from "../stores";

export const getCurrentStore = cache(async (store?: string) => {
	try {
		console.log("+++++Current Store+++++++++++");
		let storeCode = store ?? getStoreFromHeader();
		let currentStore;
		if (!storeCode) {
			return (currentStore = await getDefaultStore());
		}
		const availableStores = await getAvaliableStores();
		currentStore = availableStores?.find(
			(store) => store?.store_code === storeCode
		);
		if (!currentStore || !currentStore.store_code) {
			return (currentStore = await getDefaultStore());
		}

		return currentStore;
	} catch (error) {
		throw error;
	}
});
