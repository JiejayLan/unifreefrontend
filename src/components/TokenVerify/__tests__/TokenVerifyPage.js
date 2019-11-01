import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { TokenVerifyPage } from '../TokenVerifyPage';
import { serviceRequest } from '../../../services/serviceRequest';

jest.mock('../../../services/serviceRequest');
jest.setTimeout(5000);

describe('TokenVerifyPage test', () => {
  const successPayLoad = {
    status: 'success',
    data: {
      username: 'test',
      isValidToken: true,
      updatedAt: '2019-10-15',
    },
  };

  // eslint-disable-next-line no-unused-vars
  const failPayLoad = {
    status: 'success',
    data: {
      username: 'test',
      isValidToken: false,
      updatedAt: '2019-10-15',
    },
  };

  beforeAll(() => {
    // Silence console.error
    // eslint-disable-next-line no-console
    console.error = jest.fn();
  });

  beforeEach(() => {
    serviceRequest.mockClear();
  });

  it('should verify token successfully', async () => {
    serviceRequest.mockImplementation(async () => (successPayLoad));
    const renderDom = render(<TokenVerifyPage />);
    const { container, baseElement } = renderDom;
    // const usernameInput = container.querySelectorAll('input')[0];
    const tokenInput = container.querySelectorAll('input')[0];

    // fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(tokenInput, { target: { value: '12345' } });
    fireEvent.click(container.querySelector('button'));

    await new Promise((_) => setTimeout(_, 100));
    // expect(expect(baseElement.outerHTML).toBe('<body><div></div></body>'));
  });
});
