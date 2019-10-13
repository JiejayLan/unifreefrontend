import { Error } from '../Error';

describe('error page test suite', () => {
  it('renders without crashing', () => {
    const div1 = Error;
    expect(div1).toBeDefined();
  });
});
