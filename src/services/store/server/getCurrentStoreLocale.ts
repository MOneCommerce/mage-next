import { headers, cookies } from "next/headers";
import { cache } from "react";
import {
	COOKIE_STORE_LOCALE_NAME,
	HEADER_STORE_LOCALE_NAME,
} from "../share/constants";

export const getCurrentStoreLocale = cache((store: string) => {
	let locale;
	try {
		// A header is only set when we're changing the locale,
		// otherwise we reuse an existing one from the cookie.
		const requestHeaders = headers();
		if (requestHeaders.has(HEADER_STORE_LOCALE_NAME)) {
			locale = requestHeaders.get(HEADER_STORE_LOCALE_NAME);
		} else {
			let _cookies$get;
			locale =
				(_cookies$get = cookies().get(COOKIE_STORE_LOCALE_NAME)) === null ||
				_cookies$get === void 0
					? void 0
					: _cookies$get.value;
		}
	} catch (error) {
		throw error;
	}
	if (!locale) {
		throw new Error(
			"Unable to find `store`, have you configured the middleware?`"
		);
	}
	return locale;
});
