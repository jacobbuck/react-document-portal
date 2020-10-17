# react-document-portal

React component which renders its children inside a portal attached to the document.

- :gift: Lightweight ![npm bundle size](https://badgen.net/bundlephobia/minzip/react-document-portal)
- :smile: Easy to use with simple API
- :printer: Server-side rendering out of the box
- :dolphin: Runs on Internet Explorer

## Usage

```jsx
<DocumentPortal>…</DocumentPortal>
```

### Props

- `as` tagName string used to create portal container, defaults to `"div"`.
- `children` any elements to render inside a portal.

## Requirements

Requires a minimum of React v16.8.0.
