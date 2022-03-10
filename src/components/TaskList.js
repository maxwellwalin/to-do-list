import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { useGlobalContext } from "../context";
import Task from "./Task";

const TaskList = () => {
  // get global context
  const { tasks, filter } = useGlobalContext();

  // define filteredTasks variable and update it based on the filter
  let filteredTasks;

  switch (filter) {
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

  // memo that takes in tasks state (after filtration) and maps through each task object, creating all Task components
  const FilteredTaskList = React.memo(function taskList({ tasks }) {
    return tasks.map((task, i) => (
      <Task key={ task.id } { ...task } index={ i } />
    ));
  });

  return (
    // wrap task list in droppable component (react-beautiful-dnd)
    <Droppable droppableId='list'>
      { (provided) => (
        <div
          className='taskContainer'
          div ref={ provided.innerRef }
          { ...provided.droppableProps }
        >
          {/* add the filtered tasks list */ }
          <FilteredTaskList tasks={ tasks } />

          {/* add placeholder for current expected drop location */ }
          { provided.placeholder }
        </div>
      ) }
    </Droppable>
  );
};

export default TaskList;
