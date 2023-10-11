"use client";
// import { useNumberFormat } from "@graphcommerce/next-ui";
import { useMemo } from "react";
import { CurrencyEnum } from "@/graphql/__generated__/graphql";

type MoneyProps = {
	value: number;
	currency?: CurrencyEnum;
	round?: boolean;
	/** @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#parameters */
	formatOptions?: Intl.NumberFormatOptions;
};

const name = "Money";

export function Money(props: MoneyProps) {
	const { currency, value, round = false, formatOptions } = props;

	const { data: config } = useBaseCurrency();

	const digits = (value ?? 0) % 1 !== 0;

	const options: Intl.NumberFormatOptions = useMemo(
		() => ({
			style: "currency",
			currency: currency ?? config?.storeConfig?.base_currency_code ?? "",
			...(round && !digits && { minimumFractionDigits: 0 }),
			...(round && digits && { minimumFractionDigits: 2 }),
			...(!round && { minimumFractionDigits: 2 }),
			...formatOptions,
		}),
		[
			config?.storeConfig?.base_currency_code,
			currency,
			digits,
			formatOptions,
			round,
		]
	);
	const numberFormatter = useNumberFormat(options);

	if (typeof value === "undefined" || value === null) return null;

	return <>{numberFormatter.format(value)}</>;
}
