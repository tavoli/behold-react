import { Behold } from "./core/index";
import "./index.css"

function Counter() {
  const [count, setCount] = Behold.useState(7);

  return Behold.createElement(
    "div",
    { className: "container" },
    Behold.createElement(
      "button",
      { 
        className: "decrement-button",
        onclick: () => setCount(count - 1) 
      },
      "−"
    ),
    Behold.createElement(
      "div",
      { className: "count-display" },
      count
    ),
    Behold.createElement(
      "button",
      { 
        className: "increment-button",
        onclick: () => setCount(count + 1) 
      },
      "+"
    )
  );
}

const element = Behold.createElement(Counter, null);
const rootElement = document.getElementById("root");

Behold.render(element, rootElement!);
