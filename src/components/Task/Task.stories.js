import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Task } from './Task';

export const task = {
  id: '1',
  title: 'Test Task',
  state: 'TASK_INBOX',
  checked: false,
  updatedAt: new Date(2018, 0, 1, 9, 0),
};

export const actions = {
  onPinTask: action('onPinTask'),
  onArchiveTask: action('onArchiveTask'),
};

storiesOf('Task', module).add('default', () => (
  <Task
    task={task}
    onArchiveTask={actions.onArchiveTask}
    onPinTask={actions.onPinTask}
  />
), {
  notes: 'this is the default view of the Task component',
}).add('pinned', () => (
  <Task
    task={{ title: 'testTask', state: 'TASK_PINNED', checked: true }}
    onArchiveTask={actions.onArchiveTask}
    onPinTask={actions.onPinTask}
  />
), {
  notes: 'this is how the example Task component looks pinned',
}).add('archived', () => (
  <Task
    task={{ title: 'example 2', state: 'TASK_ARCHIVED' }}
    onArchiveTask={actions.onArchiveTask}
    onPinTask={actions.onPinTask}
  />
), {
  notes: 'This is how the example component looks archived',
});
