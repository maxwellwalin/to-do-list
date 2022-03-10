import React, { useState, useContext } from "react";
import { v4 as uuid } from "uuid";

// task seeds for first time users
const sampleTasks =
  [
    {
      id: uuid().slice(0, 8),
      content: "Make your first task.",
      done: false
    },
    {
      id: uuid().slice(0, 8),
      content: "Mark your first task as complete.",
      done: true
    },
    {
      id: uuid().slice(0, 8),
      content: "Delete your first task.",
      done: false
    },
    {
      id: uuid().slice(0, 8),
      content: "Try the different filtering methods.",
      done: false
    }
  ];

// get tasks from local storage if they exist, or use the sample tasks if "tasks" does not exist in local storage yet (first time users)
const getTasks = () => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : sampleTasks;
};

// define context var
const GlobalContext = React.createContext(null);

// create app provider
const AppProvider = ({ children }) => {
  // create states
  const [tasks, setTasks] = useState(getTasks());
  const [content, setContent] = useState("");
  const [filter, setFilter] = useState("all");

  // create a new task based on content state at time of "add" button click
  const addTask = (e) => {
    e.preventDefault();

    // if there is no content, do not do anything when the user clicks "add"
    if (!content) {
      return;
    }

    // try to parse content, if it matches provided JSON schema, update task state
    try {
      const jsonData = JSON.parse(content);
      setTasks([...tasks, ...jsonData.tasks])
    } catch {
      // if parsing content fails, since there are no alternative JSON inputs, assume content is plain text, create task object, updated task state, and clear content input
      const newTask = {
        id: uuid().slice(0, 8),
        content: content,
        done: false
      };
      setTasks([...tasks, newTask]);
      setContent("");
    }
  };

  // filter out task by id and update task state
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // map through tasks and find the selected task by id, set it's .done boolean attribute to the opposite of itself, and updated task state
  const toggleDone = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  // updated filter state to the target's filter dataset
  const filterTasks = (e) => {
    setFilter(e.target.dataset["filter"]);
  };

  // filter out tasks that are .done, update task state
  const deleteDone = () => {
    setTasks(tasks.filter(task => !task.done));
  };

  return (
    <GlobalContext.Provider
      value={ {
        tasks,
        setTasks,
        addTask,
        deleteTask,
        toggleDone,
        content,
        setContent,
        filter,
        setFilter,
        filterTasks,
        deleteDone
      } }
    >
      { children }
    </GlobalContext.Provider>
  );
};

// set global context
const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalContext, AppProvider, useGlobalContext };
