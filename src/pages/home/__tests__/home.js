import Home from '../Home';

describe('home page test suite', () => {
  it('renders without crashing', () => {
    const div1 = Home;
    expect(div1).toBeDefined();
  });
});
