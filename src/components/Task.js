import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { MdCheckBoxOutlineBlank, MdCheckBox, MdDeleteOutline } from "react-icons/md";
import { useGlobalContext } from "../context";

const Task = ({ id, content, done, index }) => {
  const { deleteTask, toggleDone } = useGlobalContext();

  return (
    // draggable component wrapper from react-beautiful-dnd
    <Draggable key={ id } draggableId={ id } index={ index }>
      {/* required reference/set up from react-beautiful-dnd documentation */ }
      { (provided, snapshot) => (
        <li
          ref={ provided.innerRef }
          { ...provided.draggableProps }
          { ...provided.dragHandleProps }
          // styling for when draggable item is being dragged
          style={ {
            ...provided.draggableProps.style,
            boxShadow: snapshot.isDragging ? "0 0 8rem #f4fec1" : "none",
          } }

          className={ `task ${done && "task-done"}` }
        >
          {/* done toggle button */ }
          <button onClick={ () => toggleDone(id) }>
            { done ? <MdCheckBox /> : <MdCheckBoxOutlineBlank /> }
          </button>

          {/* task content */ }
          <p>{ content }</p>

          {/* delete task button */ }
          <button onClick={ () => deleteTask(id) }>
            <MdDeleteOutline />
          </button>

        </li>
      ) }
    </Draggable>
  );
};

export default Task;
