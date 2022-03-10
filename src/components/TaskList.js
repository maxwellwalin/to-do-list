import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { useGlobalContext } from "../context";
import Task from "./Task";

const TaskList = () => {
  const { tasks, filter } = useGlobalContext();

  let filteredTasks;

  switch (filter) {
    case "all":
      filteredTasks = [...tasks];
      break;
    case "completed":
      filteredTasks = tasks.filter((task) => task.done);
      break;
    case "incomplete":
      filteredTasks = tasks.filter((task) => !task.done);
      break;
    default:
      filteredTasks = [...tasks];
      break;
  }

  return (
    <Droppable droppableId='droppable'>
      { (provided) => (
        <ul
          className='taskContainer'
          ref={ provided.innerRef }
          { ...provided.droppableProps }
        >
          { filteredTasks.map((task, i) => (
            <Task key={ task.id } { ...task } index={ i } />
          )) }
          { provided.placeholder }
        </ul>
      ) }
    </Droppable>
  );
};

export default TaskList;
