import { Default } from '../Error.stories';

describe('Error page story test suite', () => {
  it('renders without crashing', () => {
    const div1 = Default;
    expect(div1).toBeDefined();
  });
});
