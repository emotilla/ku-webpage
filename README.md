# This is a fork from create-svelte and a working example from react-svelte

The idea is to have a working version on sveltekit and react components.
Please refer to [`svelte-react`](https://github.com/jpinho/svelte-react); for the original example made on Svelte. This repo is just a working version using svelte-kit.

React Forms:
[`React Json Schema`](https://github.com/rjsf-team/react-jsonschema-form);

example at: http://localhost:3000/rform

Materials UI example at: http://localhost:3000/rbutton

rbutton and rform sources located at /src/routes

Basic project scaffold from svelte-kit:

powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte);


## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
npm run build
```

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.
