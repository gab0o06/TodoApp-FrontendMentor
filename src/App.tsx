import { useRef, useState, useEffect } from "react";
import "./App.css";

import { Task, OneTaskData } from "./components/task";

function App() {
  const [tasksList, setTasksList] = useState<OneTaskData[]>([]);
  const [tasksFilter, setTasksFilter] = useState<string>("all");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isPhoneView, setIsPhoneView] = useState<boolean>(false);
  const id = useRef<number>(1);

  useEffect(() => {
    const mql = matchMedia("(max-width: 480px)");
    mql.matches && setIsPhoneView(!isPhoneView);
  }, []);

  const createTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let input = e.target as HTMLInputElement;
    if (e.key === "Enter") {
      if (!input.value) return alert("Please enter a task...");
      setTasksList([
        ...tasksList,
        { id: id.current.toString(), task: input.value, completed: false },
      ]);

      id.current += 1;

      input.value = "";
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    let actualMode;
    document.body.classList[0] == "theme-dark"
      ? (actualMode = "theme-dark")
      : (actualMode = "theme-light");
    document.body.classList.replace(
      actualMode,
      actualMode == "theme-light" ? "theme-dark" : "theme-light"
    );
  };

  return (
    <div className="main">
      <img
        className="body__background"
        src={
          isPhoneView
            ? isDarkMode
              ? "/assets/bg-mobile-dark.jpg"
              : "/assets/bg-mobile-light.jpg"
            : isDarkMode
            ? "/assets/bg-desktop-dark.jpg"
            : "/assets/bg-desktop-light.jpg"
        }
        alt="bg-dark"
      />
      <main className="main__container">
        <div className="main__header-container">
          <h1 className="main__title">TODO</h1>
          <img
            className="main__icon-theme"
            src={isDarkMode ? "/assets/icon-sun.svg" : "/assets/icon-moon.svg"}
            alt="sun"
            onClick={() => {
              toggleTheme();
            }}
          />
        </div>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="form__action"></div>
          <input
            className="form__add"
            type="text"
            placeholder="Create a new todo..."
            onKeyDown={(e) => createTask(e)}
          />
        </form>
        <article className="todo__list">
          <div
            className="todo__tasks"
            onDrop={(e) => {
              e.dataTransfer.setData(
                "text/plain",
                (e.target as HTMLDivElement).id
              );
            }}
          >
            {tasksList[0] ? (
              tasksList.map(({ id, task, completed }, key) => {
                if (tasksFilter == "all") {
                  return (
                    <Task
                      isPhoneView={isPhoneView}
                      key={key}
                      id={id}
                      task={task}
                      completed={completed}
                      tasksList={tasksList}
                      setTasksList={setTasksList}
                    />
                  );
                } else if (tasksFilter == "active") {
                  if (!completed) {
                    return (
                      <Task
                        isPhoneView={isPhoneView}
                        key={key}
                        id={id}
                        task={task}
                        completed={completed}
                        setTasksList={setTasksList}
                        tasksList={tasksList}
                      />
                    );
                  }
                } else if (tasksFilter == "completed") {
                  if (completed) {
                    return (
                      <Task
                        isPhoneView={isPhoneView}
                        key={key}
                        id={id}
                        task={task}
                        completed={completed}
                        setTasksList={setTasksList}
                        tasksList={tasksList}
                      />
                    );
                  }
                }
              })
            ) : (
              <div>Empty</div>
            )}
          </div>
          <div className="todo__actions">
            <div className="todo__actions-left">
              {
                tasksList.filter((taskItem) => taskItem.completed !== true)
                  .length
              }{" "}
              items left
            </div>
            <div
              className={
                isPhoneView
                  ? "todo__actions-filter hidden"
                  : "todo__actions-filter"
              }
            >
              <p
                onClick={() => setTasksFilter("all")}
                className={
                  tasksFilter === "all"
                    ? "todo__actions-filters active"
                    : "todo__actions-filters"
                }
              >
                All
              </p>
              <p
                onClick={() => setTasksFilter("active")}
                className={
                  tasksFilter === "active"
                    ? "todo__actions-filters active"
                    : "todo__actions-filters"
                }
              >
                Active
              </p>
              <p
                onClick={() => setTasksFilter("completed")}
                className={
                  tasksFilter === "completed"
                    ? "todo__actions-filters active"
                    : "todo__actions-filters"
                }
              >
                Completed
              </p>
            </div>
            <div
              onClick={() =>
                setTasksList(
                  tasksList.filter(
                    (taskElement) => taskElement.completed !== true
                  )
                )
              }
              className="todo__actions-clear"
            >
              Clear Completed
            </div>
          </div>
        </article>
        <div
          className={
            isPhoneView ? "todo__filters-mobile" : "todo__filters-mobile hidden"
          }
        >
          <div className="todo__actions-filter">
            <p
              onClick={() => setTasksFilter("all")}
              className={
                tasksFilter === "all"
                  ? "todo__actions-filters active"
                  : "todo__actions-filters"
              }
            >
              All
            </p>
            <p
              onClick={() => setTasksFilter("active")}
              className={
                tasksFilter === "active"
                  ? "todo__actions-filters active"
                  : "todo__actions-filters"
              }
            >
              Active
            </p>
            <p
              onClick={() => setTasksFilter("completed")}
              className={
                tasksFilter === "completed"
                  ? "todo__actions-filters active"
                  : "todo__actions-filters"
              }
            >
              Completed
            </p>
          </div>
        </div>
        <footer
          className="footer__container"
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => {
            const taskReOrder = [...tasksList].sort((x, y) =>
              x.task.localeCompare(y.task)
            );
            setTasksList(taskReOrder);
          }}
        >
          <p>Drag and drop to reorder list</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
