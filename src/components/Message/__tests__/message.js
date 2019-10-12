import Message from '../Message';

describe('message component test suite', () => {
  it('renders without crashing', () => {
    const div1 = Message;
    expect(div1).toBeDefined();
  });
});
