import React from "react";
import ReactDOM from "react-dom/client";
// import Main from "./arrayOfObjects/Main.jsx";
// import Main from "./webpage/Main.jsx";
// import Main from "./dotsOnScreen/Main.jsx";
import Todo from "./reducers/Todo.jsx";

const divFromHTML = document.querySelector("#root");

ReactDOM.createRoot(divFromHTML).render(<Todo />);
