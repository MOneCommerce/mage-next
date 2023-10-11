import { getApolloClient } from "../ecom/graphql/appoloClient";
import {
	AvailableStoresDocument,
	AvailableStoresQuery,
	AvailableStoresQueryVariables,
	StoreConfig,
} from "@/graphql/__generated__/graphql";

export const fetchAvaliableStores = async () => {
	const client = getApolloClient();
	const response = await client.query<
		AvailableStoresQuery,
		AvailableStoresQueryVariables
	>({
		query: AvailableStoresDocument,
		variables: {},
	});

	return response.data.availableStores;
};

export { getDefaultStore } from "./server/getDefaultStore";
export { getCurrentStore } from "./server/getCurrentStore";
export { getAvaliableStores } from "./server/getAvaliableStores";
