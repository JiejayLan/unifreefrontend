import { Default } from '../Home.stories';

describe('Home page story test suite', () => {
  it('renders without crashing', () => {
    const div1 = Default;
    expect(div1).toBeDefined();
  });
});
