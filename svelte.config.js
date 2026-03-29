import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Svelte 5: force runes mode everywhere (app + node_modules) so libraries like bits-ui compile correctly.
	// See https://svelte.dev/docs/svelte/compiler-options#runes
	compilerOptions: {
		runes: true
	},
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;
