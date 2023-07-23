import { Dispatch, useState, useEffect } from "react";

export interface OneTaskData {
  id: string;
  task: string;
  completed: boolean;
}

export interface TasksData {
  id: string;
  task: string;
  completed: boolean;
  setTasksList: Dispatch<React.SetStateAction<OneTaskData[]>>;
  isPhoneView: boolean;
  tasksList: OneTaskData[];
}

export const Task = ({
  id,
  task,
  completed,
  setTasksList,
  tasksList,
  isPhoneView,
}: TasksData) => {
  const [isShow, setIsShow] = useState<boolean>(completed);
  const [showCross, setShowCross] = useState<boolean>(false);

  useEffect(() => {
    setIsShow(completed);
  }, [completed, tasksList]);

  const handleCompleted = () => {
    const newCompletedTask = tasksList.map((taskElement) => {
      if (taskElement.task === task) {
        taskElement.completed = !completed;
      }
      return taskElement;
    });

    setTasksList(newCompletedTask);
  };

  return (
    <div
      id={id}
      className="task"
      onMouseEnter={() => setShowCross(!showCross)}
      onMouseLeave={() => setShowCross(!showCross)}
      draggable="true"
    >
      <div className="task__container">
        <div
          className={isShow ? "completed-action" : "task__action"}
          onClick={() => {
            setIsShow(!isShow);
            handleCompleted();
          }}
        >
          <img
            className={isShow ? "" : "hidden"}
            src="/assets/icon-check.svg"
            alt=""
          />
        </div>
        <p className={isShow ? "task__desc completed" : "task__desc"}>{task}</p>
      </div>
      <div
        className={
          isPhoneView
            ? "task__delete"
            : showCross
            ? "task__delete"
            : "hidden task__delete"
        }
        onClick={() =>
          setTasksList(tasksList.filter((taskItem) => taskItem.task !== task))
        }
      >
        <img className="action__icon" src="/assets/icon-cross.svg" alt="" />
      </div>
    </div>
  );
};
