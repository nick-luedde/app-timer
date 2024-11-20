# dockable-timer

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```


# DockableTimer

This Vue.js component is a dockable stopwatch/timer overlay component. It can be docked to any corner of the browser window.

## Using the component

Here's a basic example of using the file:

```html
<Dockable-Timer
  :so-and-so="whatever"
>
</Dockable-Timer>
```

For a bit more in-depth look, [check out Example.ts](src/Example.ts)