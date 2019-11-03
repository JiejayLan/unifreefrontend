import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { TokenVerifyForm } from '../TokenVerifyForm';
import { serviceRequest } from '../../../../services/serviceRequest';

jest.mock('../../../../services/serviceRequest');
jest.setTimeout(5000);

describe('TokenVerifyForm test', () => {
  const successPayLoad = {
    status: 'success',
    data: {
      username: 'test',
      isValidToken: true,
      updatedAt: '2019-10-15',
    },
  };

  const failTokenPayLoad = {
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
    const renderDom = render(<TokenVerifyForm />);
    const { container, baseElement } = renderDom;
    const usernameInput = container.querySelectorAll('input')[0];
    const tokenInput = container.querySelectorAll('input')[1];
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(tokenInput, { target: { value: '12345' } });

    fireEvent.click(container.querySelector('button'));
    await new Promise((_) => setTimeout(_, 100));
    expect(expect(baseElement.outerHTML).toBe('<body><div></div></body>'));
  });

  it('should catch error for wrong token', async () => {
    serviceRequest.mockReturnValue(failTokenPayLoad);
    const renderDom = render(<TokenVerifyForm />);
    const { container, getByText } = renderDom;
    const usernameInput = container.querySelectorAll('input')[0];
    const tokenInput = container.querySelectorAll('input')[1];
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(tokenInput, { target: { value: '12345' } });

    fireEvent.click(container.querySelector('button'));
    await new Promise((_) => setTimeout(_, 100));
    expect(getByText('Wrong Token, Please Re-enter')).toBeInTheDocument();
  });

  it('should catch error for internal service error', async () => {
    serviceRequest.mockImplementation(async () => { throw new Error('Internal Service Error'); });
    const renderDom = render(<TokenVerifyForm />);
    const { container, getByText } = renderDom;
    const usernameInput = container.querySelectorAll('input')[0];
    const tokenInput = container.querySelectorAll('input')[1];
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(tokenInput, { target: { value: '12345' } });

    fireEvent.click(container.querySelector('button'));
    await new Promise((_) => setTimeout(_, 100));
    expect(getByText('Internal Service Error')).toBeInTheDocument();
  });

  it('should catch error for internal service error', async () => {
    serviceRequest.mockImplementation(async () => {});
    const renderDom = render(<TokenVerifyForm />);
    const { container, getByText } = renderDom;
    const usernameInput = container.querySelectorAll('input')[0];
    const tokenInput = container.querySelectorAll('input')[1];
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(tokenInput, { target: { value: '12345' } });

    fireEvent.click(container.querySelector('button'));
    await new Promise((_) => setTimeout(_, 100));
    expect(getByText('Internal Service Error')).toBeInTheDocument();
  });

  it('should fail to verify token, because of missing token', async () => {
    serviceRequest.mockReturnValue(failTokenPayLoad);
    const renderDom = render(<TokenVerifyForm />);
    const { container } = renderDom;
    const tokenInput = container.querySelectorAll('input')[0];
    fireEvent.change(tokenInput, { target: { value: 'testuser' } });
    fireEvent.click(container.querySelector('button'));
    expect(serviceRequest).not.toHaveBeenCalled();
  });
});
