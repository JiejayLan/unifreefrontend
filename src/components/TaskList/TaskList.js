// src/components/TaskList.js

import React from 'react';
import { bool, arrayOf } from 'prop-types';
import { Task } from '../Task';


function TaskList({ loading, tasks }) {
  if (loading) {
    return <div className="list-items">loading</div>;
  }

  if (tasks.length === 0) {
    return <div className="list-items">empty</div>;
  }

  return (
    <div className="list-items">
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
}


TaskList.propTypes = {
  loading: bool.isRequired,
  tasks: arrayOf(Task.propTypes.task).isRequired,
};

export { TaskList };
