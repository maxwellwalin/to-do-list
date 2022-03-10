import React, { useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Filter from "./components/Filter";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import { useGlobalContext } from "./context";

const App = () => {
  // get global context
  const {
    tasks,
    setTasks,
    content,
    setContent,
    addTask,
    deleteDone
  } = useGlobalContext();

  // useEffect to update local storage tasks whenever tasks state changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // handle drag and drop end (react-beautiful-dnd)
  const onDragEnd = (param) => {
    const sourceIndex = param.source.index;
    const destinationIndex = param.destination?.index;
    const rearrangedTasks = [...tasks];

    const [removed] = rearrangedTasks.splice(sourceIndex, 1);
    rearrangedTasks.splice(destinationIndex, 0, removed);
    setTasks(rearrangedTasks);
  };

  return (
    <>
      <Header />
      <main>
        {/* Form - Input and Add Button */ }
        <form onSubmit={ addTask }>
          <input
            type='text'
            placeholder="Let's get some stuff done!"
            value={ content }
            onChange={ (e) => setContent(e.target.value) }
          />
          <button type='submit'>Add</button>
        </form>

        {/* If there are any tasks, render the Filter and TaskList Components; if not, display message. */ }
        <DragDropContext onDragEnd={ onDragEnd }>
          { tasks.length > 0 ? (
            <>
              <Filter />
              <TaskList />
            </>
          ) : (
            <p className='no-tasks'>You're either super effecient or haven't added any tasks, yet!</p>
          ) }
        </DragDropContext>

        {/* If there are any done tasks, render the Delete Completed Button. */ }
        { tasks.filter(task => task.done).length > 0 && (
          <button
            className='btn-delete-done'
            onClick={ deleteDone }
          >
            Delete Completed Tasks
          </button>
        ) }
      </main>
    </>
  );
};

export default App;
