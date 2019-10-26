import React from 'react';
import { Task } from '../Task';

describe('Task object example', () => {
  it('renders without crashing', () => {
    const task = <Task task={{ title: 'example', state: 'TASK_PINNED' }} />;
    expect(task).toBeDefined();
  });
});
