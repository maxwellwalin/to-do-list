import React from 'react'
import { useGlobalContext } from '../context';

export default function Filter() {
    const { filter, filterTasks, tasks } = useGlobalContext();

    return (
        <div id='filtersContainer'>
            <div id='filters'>
                <button
                    data-filter='all'
                    className={ filter === "all" ? "active" : "" }
                    onClick={ filterTasks }
                >
                    All
                </button>
                <button
                    data-filter='completed'
                    className={ filter === "completed" ? "active" : "" }
                    onClick={ filterTasks }
                >
                    Completed
                </button>
                <button
                    data-filter='incomplete'
                    className={ filter === "incomplete" ? "active" : "" }
                    onClick={ filterTasks }
                >
                    Incomplete
                </button>
            </div>
            <div id='taskCount'>
                Tasks Left: { tasks.filter(task => !task.done).length }
            </div>
        </div>
    )
}
