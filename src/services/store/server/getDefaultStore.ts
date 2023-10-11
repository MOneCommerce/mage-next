import { StoreConfig } from "@/graphql/__generated__/graphql";
import { getAvaliableStores } from "./getAvaliableStores";

export const getDefaultStore = async (): Promise<StoreConfig> => {
	const availableStores = await getAvaliableStores();
	const defaultStore = availableStores?.find(
		(store) => store?.is_default_store === true
	);

	return defaultStore as StoreConfig;
};
