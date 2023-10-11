import {
	AvailableStoresDocument,
	AvailableStoresQuery,
	AvailableStoresQueryVariables,
	StoreConfig,
} from "@/graphql/__generated__/graphql";
import { getApolloClient } from "@/services/ecom/graphql/appoloClient";
import { GraphQLError } from "graphql";

export const getAvaliableStores = async (): Promise<any> => {
	const client = getApolloClient();
	const response = await client.query<
		AvailableStoresQuery,
		AvailableStoresQueryVariables
	>({
		query: AvailableStoresDocument,
		variables: {},
	});

	if (response.errors) {
		throw new GraphQLError("You are not authorized to perform this action.");
	}
	if (
		!response.data.availableStores ||
		response.data.availableStores.length === 0
	) {
		throw new GraphQLError("You are not authorized to perform this action.");
	}

	return response.data.availableStores;
};
