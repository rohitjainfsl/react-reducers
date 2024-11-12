import { useReducer } from "react";
import { TiDelete } from "react-icons/ti";
import { TiEdit } from "react-icons/ti";
import "./todo.css";

const initialState = {
  inputValue: "",
  tasks: [],
  isEditing: false,
  editTaskId: null,
  completedTasks: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "input":
      return { ...state, inputValue: action.payload };

    case "addTask":
      return state.isEditing
        ? {
            ...state,
            tasks: state.tasks.map((task) =>
              task.id === state.editTaskId
                ? { ...task, task: state.inputValue }
                : task
            ),
            inputValue: "",
            isEditing: false,
            editTaskId: null,
          }
        : {
            ...state,
            tasks: [...state.tasks, { id: Date.now(), task: state.inputValue }],
            inputValue: "",
          };

    case "deleteTask":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "editTask":
      return {
        ...state,
        isEditing: true,
        editTaskId: action.payload,
        inputValue: state.tasks.find((task) => task.id === action.payload).task,
      };
    case "toggleCompleteStatus":
      return action.payload.event.target.checked
        ? {
            ...state,
            completedTasks: [...state.completedTasks, action.payload.id],
          }
        : {
            ...state,
            completedTasks: state.completedTasks.filter(
              (id) => id !== action.payload.id
            ),
          };
  }
}

function Todo() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <div id="todo">
        <div className="inputs">
          <input
            type="text"
            onChange={(e) =>
              dispatch({ type: "input", payload: e.target.value })
            }
            value={state.inputValue}
          />
          <button onClick={() => dispatch({ type: "addTask" })}>
            {state.isEditing ? "Edit Task" : "Add Task"}
          </button>
        </div>

        <ul>
          {state.tasks.map((task) => {
            return (
              <li
                key={task.id}
                className={
                  state.completedTasks.includes(task.id) ? "completed" : ""
                }
              >
                <input
                  type="checkbox"
                  title="Mark as Complete"
                  name="isComplete"
                  id=""
                  onClick={(e) =>
                    dispatch({
                      type: "toggleCompleteStatus",
                      payload: { event: e, id: task.id },
                    })
                  }
                />
                <span>{task.task}</span>
                <TiDelete
                  onClick={() =>
                    dispatch({ type: "deleteTask", payload: task.id })
                  }
                />
                <TiEdit
                  onClick={() =>
                    dispatch({ type: "editTask", payload: task.id })
                  }
                />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Todo;
