import { Behold } from "./core/index";

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
      "span",
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

export default Counter;