import ReactDOM from "react-dom/client";
import Todo from "./reducers/Todo.jsx";

const divFromHTML = document.querySelector("#root");

ReactDOM.createRoot(divFromHTML).render(<Todo />);
