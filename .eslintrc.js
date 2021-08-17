module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ["plugin:vue/essential", "eslint:recommended"],
	parserOptions: {
		parser: "babel-eslint"
	},
	rules: {
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
		semi: ["error", "never"],
		quotes: ["error", "double"],
		"no-multi-spaces": "error",
		"no-mixed-spaces-and-tabs": 0,
		"no-multiple-empty-lines": ["error", { max: 1 }],
		"eol-last": ["error", "always"],
		"no-duplicate-imports": "error"
	}
}
