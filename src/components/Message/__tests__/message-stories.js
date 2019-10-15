import { withText } from '../Message.stories';

describe('Message story test suite', () => {
  it('renders without crashing', () => {
    const div1 = withText;
    expect(div1).toBeDefined();
  });
});
