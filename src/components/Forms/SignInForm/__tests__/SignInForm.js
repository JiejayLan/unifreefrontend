import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { SignInForm } from '../SignInForm';
import { serviceRequest } from '../../../../services/serviceRequest';

jest.mock('../../../../services/serviceRequest');
jest.setTimeout(5000);

describe('SignInForm test suite', () => {
  const successPayLoad = {
    status: 'success',
    data: {
      username: 'test',
      token: '123',
      updatedAt: '2019-10-15',
    },
  };

  const failPayLoad = {
    status: 'error',
    data: {
      username: 'test',
      token: '',
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

  it('should sign in successfully', async () => {
    serviceRequest.mockImplementation(async () => (successPayLoad));
    const renderDom = render(<SignInForm />);
    const { container, baseElement } = renderDom;
    const usernameInput = container.querySelectorAll('input')[0];
    const passwordInput = container.querySelectorAll('input')[1];

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(container.querySelector('button'));
    await new Promise((_) => setTimeout(_, 100));
    expect(expect(baseElement.outerHTML).toBe('<body><div></div></body>'));
  });

  it('should catch error for wrong credential', async () => {
    serviceRequest.mockReturnValue(failPayLoad);
    const renderDom = render(<SignInForm />);
    const { container, getByText } = renderDom;
    const usernameInput = container.querySelectorAll('input')[0];
    const passwordInput = container.querySelectorAll('input')[1];

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('testpassword');

    fireEvent.click(container.querySelector('button'));
    await new Promise((_) => setTimeout(_, 100));
    expect(getByText('Invalid username or password')).toBeInTheDocument();
  });


  it('should catch error for internal service error', async () => {
    serviceRequest.mockImplementation(async () => { throw new Error('Internal Service Error'); });
    const renderDom = render(<SignInForm />);
    const { container, getByText } = renderDom;
    const usernameInput = container.querySelectorAll('input')[0];
    const passwordInput = container.querySelectorAll('input')[1];

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('testpassword');

    fireEvent.click(container.querySelector('button'));
    await new Promise((_) => setTimeout(_, 100));
    expect(getByText('Internal Service Error')).toBeInTheDocument();
  });

  it('should catch error for internal service error', async () => {
    serviceRequest.mockReturnValue({});
    const renderDom = render(<SignInForm />);
    const { container, getByText } = renderDom;
    const usernameInput = container.querySelectorAll('input')[0];
    const passwordInput = container.querySelectorAll('input')[1];

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('testpassword');

    fireEvent.click(container.querySelector('button'));
    await new Promise((_) => setTimeout(_, 100));
    expect(getByText('Internal Service Error')).toBeInTheDocument();
  });

  it('should fail to sign in, because of missing password', async () => {
    serviceRequest.mockReturnValue(failPayLoad);
    const renderDom = render(<SignInForm />);
    const { container } = renderDom;
    const usernameInput = container.querySelectorAll('input')[0];

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.click(container.querySelector('button'));
    expect(serviceRequest).not.toHaveBeenCalled();
  });

  it('should fail to sign in, because of missing username', async () => {
    serviceRequest.mockReturnValue(failPayLoad);
    const renderDom = render(<SignInForm />);
    const { container } = renderDom;
    const passwordInput = container.querySelectorAll('input')[1];
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(container.querySelector('button'));
    expect(serviceRequest).not.toHaveBeenCalled();
  });
});
