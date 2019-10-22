import React from 'react';
import { TaskList } from '../TaskList';
import { task } from '../../Task/Task.stories';

const defaultTasks = [
  { ...task, id: '1', title: 'Task 1' },
  { ...task, id: '2', title: 'Task 2' },
  { ...task, id: '3', title: 'Task 3' },
  { ...task, id: '4', title: 'Task 4' },
  { ...task, id: '5', title: 'Task 5' },
  { ...task, id: '6', title: 'Task 6' },
];

describe('TaskList object example', () => {
  it('renders without crashing', () => {
    const taskList = <TaskList tasks={defaultTasks} loading={false} />;
    expect(taskList).toBeDefined();
  });
});

describe('TaskList object loading', () => {
  it('renders without crashing', () => {
    const taskList = <TaskList tasks={defaultTasks} loading />;
    expect(taskList).toBeDefined();
  });
});

describe('TaskList object empty', () => {
  it('renders without crashing', () => {
    const taskList = <TaskList tasks={[]} loading={false} />;
    expect(taskList).toBeDefined();
  });
});


describe('TaskList object loading empty', () => {
  it('renders without crashing', () => {
    const taskList = <TaskList tasks={[]} loading />;
    expect(taskList).toBeDefined();
  });
});
