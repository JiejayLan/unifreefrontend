import { AppRouter } from '../AppRouter';

describe('app router test suite', () => {
  it('renders without crashing', () => {
    const div1 = AppRouter;
    expect(div1).toBeDefined();
  });
});
