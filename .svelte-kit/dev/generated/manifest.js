const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../components/error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/integrations.svelte"),
	() => import("../../../src/routes/sankey_items.svelte"),
	() => import("../../../src/routes/services.svelte"),
	() => import("../../../src/routes/contact.svelte"),
	() => import("../../../src/routes/rbutton.svelte"),
	() => import("../../../src/routes/about.svelte"),
	() => import("../../../src/routes/rform.svelte"),
	() => import("../../../src/routes/todos/index.svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/integrations.svelte
	[/^\/integrations\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/sankey_items.svelte
	[/^\/sankey_items\/?$/, [c[0], c[4]], [c[1]]],

	// src/routes/services.svelte
	[/^\/services\/?$/, [c[0], c[5]], [c[1]]],

	// src/routes/contact.svelte
	[/^\/contact\/?$/, [c[0], c[6]], [c[1]]],

	// src/routes/rbutton.svelte
	[/^\/rbutton\/?$/, [c[0], c[7]], [c[1]]],

	// src/routes/about.svelte
	[/^\/about\/?$/, [c[0], c[8]], [c[1]]],

	// src/routes/rform.svelte
	[/^\/rform\/?$/, [c[0], c[9]], [c[1]]],

	// src/routes/todos/index.json.ts
	[/^\/todos\.json$/],

	// src/routes/todos/index.svelte
	[/^\/todos\/?$/, [c[0], c[10]], [c[1]]],

	// src/routes/todos/[uid].json.ts
	[/^\/todos\/([^/]+?)\.json$/]
];

export const fallback = [c[0](), c[1]()];