# dotElement

![dotElement](https://img.shields.io/npm/v/dotElement?style=flat-square)
![License](https://img.shields.io/npm/l/dotElement?style=flat-square)
![Downloads](https://img.shields.io/npm/dt/dotElement?style=flat-square)

🚀 **dotElement** is a lightweight utility similar to `React.createElement`, but for vanilla JavaScript. It allows you to create and manage DOM elements efficiently with a JSX-like approach.

## 🌟 Features
- 🏗 **JSX-like API** for creating DOM elements.
- 🎨 **Styling Support**: Apply styles using `className` or an inline `style` object (like: `{backgroundColor: "red"}`).
- 🎭 **Event Listeners**: Add event handlers just like in React (`onClick`, `onChange`, etc.).
- 🏎 **Lightweight** & **fast**.
- 🛠 Fully **TypeScript-supported**.

## 📦 Installation

Install via **npm** or **pnpm**:
```sh
npm install dotElement
```
Or using **pnpm**:
```sh
pnpm add dotElement
```

## 🚀 Usage

### Basic Example
```ts
import { createElement } from "dotElement";

document.body.appendChild(
  createElement("button", {
    className: "btn-primary",
    style: { backgroundColor: "blue", color: "white", padding: "10px" },
    onClick: () => alert("Button Clicked!"),
  }, "Click Me!")
);
```

### Nested Elements Example
```ts
const container = createElement("div", { className: "container" },
  createElement("h1", {}, "Hello, dotElement!"),
  createElement("p", {}, "This is a lightweight JSX alternative for vanilla JS."),
  createElement("button", {
    onClick: () => alert("Clicked!"),
    style: { padding: "10px", backgroundColor: "green", color: "white" }
  }, "Click Me")
);

document.body.appendChild(container);
```

## ✨ API

### `createElement(tagName, props?, ...children): HTMLElement`

| Parameter   | Type                         | Description |
|------------|-----------------------------|-------------|
| `tagName`  | `string`                     | The HTML tag name (e.g., `"div"`, `"span"`). |
| `props`    | `ElementProps (optional)`   | Attributes, event listeners, className, and styles. |
| `children` | `Children[]`                 | The child elements (text, numbers, elements, or nested arrays). |

### Props
#### Styling
- `className` → Sets `class` attribute.
- `style` → Supports inline styles as an object or string.

#### Event Listeners
- Supports event handlers like React (`onClick`, `onChange`, `onMouseEnter`, etc.).
- Automatically converts `onEventName` to the correct event type.

#### Other Attributes
- Any valid HTML attribute (e.g., `id`, `title`, `href`, etc.).

## 🛠 TypeScript Support
`dotElement` is fully typed! 🎯
```ts
const heading: HTMLHeadingElement = createElement("h1", {}, "Welcome!");
```

## 📜 License
MIT License © 2025. Feel free to use, modify, and contribute! 🚀

---
### 🔗 Links
- **NPM:** [dotElement on npm](https://www.npmjs.com/package/dotElement)
- **GitHub:** [dotElement Repository](https://github.com/programming-with-ia/dotElement)

---

💡 **Contributions & Issues:** Feel free to open an issue or submit a PR on GitHub!