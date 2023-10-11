import { headers, cookies } from "next/headers";
import { cache } from "react";
import { COOKIE_STORE_CODE, HEADER_STORE_CODE } from "../share/constants";

export const getStoreFromHeader = cache(() => {
	let storeCode;
	try {
		// A header is only set when we're changing the locale,
		// otherwise we reuse an existing one from the cookie.
		const requestHeaders = headers();
		console.log(requestHeaders);
		if (requestHeaders.has(HEADER_STORE_CODE)) {
			storeCode = requestHeaders.get(HEADER_STORE_CODE);
		} else {
			let _cookies$get;
			storeCode =
				(_cookies$get = cookies().get(COOKIE_STORE_CODE)) === null ||
				_cookies$get === void 0
					? void 0
					: _cookies$get.value;
		}
	} catch (error) {
		throw error;
	}
	if (!storeCode) {
		throw new Error(
			"Unable to find `store`, have you configured the middleware?`"
		);
	}
	return storeCode;
});
