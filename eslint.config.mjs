import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
	...nextVitals,
	...nextTs,
	globalIgnores([
		".next/**",
		"out/**",
		"build/**",
		"next-env.d.ts",
	]),
	{
		rules: {
			"semi": ["warn", "always"],
			"@typescript-eslint/explicit-function-return-type": [
				"warn",
				{
					allowExpressions: true,
					allowTypedFunctionExpressions: true,
					allowHigherOrderFunctions: true,
					allowDirectConstAssertionInArrowFunctions: true,
					allowSingleExtends: true,
				},
			],
		},
	},
]);