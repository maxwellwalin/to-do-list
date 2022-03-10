import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { MdCheckBoxOutlineBlank, MdCheckBox, MdDeleteOutline } from "react-icons/md";
import { useGlobalContext } from "../context";

const Task = ({ id, content, done, index }) => {
  const { deleteTask, toggleDone } = useGlobalContext();

  return (
    <Draggable key={ id } draggableId={ id } index={ index }>
      { (provided, snapshot) => (
        <li
          ref={ provided.innerRef }
          { ...provided.draggableProps }
          { ...provided.dragHandleProps }
          style={ {
            ...provided.draggableProps.style,
            boxShadow: snapshot.isDragging ? "0 0 10rem #f4fec1" : "none",
            opacity: snapshot.isDragging ? "1" : provided.draggableProps.style.opacity,
          } }
          className={ `task ${done && "task-done"}` }
        >
          <button onClick={ () => toggleDone(id) }>
            { done ? <MdCheckBox /> : <MdCheckBoxOutlineBlank /> }
          </button>
          <p>{ content }</p>
          <button onClick={ () => deleteTask(id) }>
            <MdDeleteOutline />
          </button>
        </li>
      ) }
    </Draggable>
  );
};

export default Task;
