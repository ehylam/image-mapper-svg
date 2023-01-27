// See https://kit.svelte.dev/docs/types#app
import { inject } from '@vercel/analytics';

inject();

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export { };
