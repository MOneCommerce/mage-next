import {
	UrlResolverDocument,
	UrlResolverQuery,
	UrlResolverQueryVariables,
} from "@/graphql/__generated__/graphql";
import { getApolloClient } from "../ecom/graphql/appoloClient";

export const handleUrlResolver = async (urlKey: string) => {
	const client = getApolloClient();
	const response = await client.query<
		UrlResolverQuery,
		UrlResolverQueryVariables
	>({
		query: UrlResolverDocument,
		variables: { url: urlKey },
	});
	if (response.error) {
		return {
			type: "NOT_FOUND",
		};
	}

	const urlResolver = response.data.route;
	if (!urlResolver) {
		return {
			type: "NOT_FOUND",
		};
	}

	if (urlResolver?.type === "PRODUCT") {
		const redirectLink = urlResolver?.url_rewrites?.find((urlRewrite) => {
			return urlRewrite.url === urlKey;
		});
		console.log("========");

		console.log(redirectLink);
		const seller = redirectLink.parameters.find((parameter) => {
			return parameter.name === "seller";
		});
		let newRedirectUrl = `/product/${urlResolver.url_key}`;
		newRedirectUrl += seller ? `/${seller.value}` : "";
		return {
			...urlResolver,
			redirect: newRedirectUrl,
		};
	}

	if (urlResolver.type === "CATEGORY") {
		return {
			...urlResolver,
			redirect: `/category/${urlResolver.url_key}`,
		};
	}

	if (urlResolver.type === "CMS_PAGE") {
		return {
			...urlResolver,
			redirect: `/page/${urlResolver.url_key}`,
		};
	}

	return {
		...urlResolver,
		type: "NOT_SUPPORTED",
	};
};
