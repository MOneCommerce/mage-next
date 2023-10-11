import {
	UrlResolverDocument,
	UrlResolverQuery,
	UrlResolverQueryVariables,
} from "@/graphql/__generated__/graphql";
import { getApolloClient } from "../ecom/graphql/appoloClient";

export const urlResolver = async (urlKey: string) => {
	const client = getApolloClient();
	const response = await client.query<
		UrlResolverQuery,
		UrlResolverQueryVariables
	>({
		query: UrlResolverDocument,
		variables: { url: urlKey },
	});

	const route = response.data.route;
	return {
		// ...route,
		type: route?.type,
		relative_url: route?.relative_url,
		redirect_code: route?.redirect_code,
		...(route?.type === "PRODUCT" && {
			sku: route.sku,
			url_key: route.url_key,
			uid: route.uid,
			url_rewrite: route?.url_rewrites?.find((urlRewrite) => {
				return urlRewrite.url === urlKey;
			}),
		}),
		...(route?.type === "CATEGORY" && {
			url_key: route.url_key,
			uid: route.uid,
			url_rewrite: route.url_path,
		}),
		...(route?.type === "CMS_PAGE" && {
			sku: route.sku,
			url_key: route.url_key,
			uid: route.uid,
			url_rewrite: route.url_key,
		}),
	};
};
