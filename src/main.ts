import { Behold } from "./core/index";
import Counter from "./Counter";
import "./index.css"

const element = Behold.createElement(Counter, null);
const rootElement = document.getElementById("root");

Behold.render(element, rootElement!);
