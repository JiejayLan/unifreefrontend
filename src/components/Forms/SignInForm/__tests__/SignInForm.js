import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { SignInForm } from '../SignInForm';
import { serviceRequest } from '../../../../services/serviceRequest';

jest.mock('../../../../services/serviceRequest');
jest.setTimeout(10000);

describe('SignInForm test', () => {
  const payLoad = {
    status: 'success',
    data: {
      username: 'test',
      token: '',
      updatedAt: '2019-10-15',
    },
  };

  beforeAll(() => {
    // Silence until testing-library fixed to use act()
    // eslint-disable-next-line no-console
    console.error = jest.fn();
  });

  beforeEach(() => {
    serviceRequest.mockClear();
  });

  // it('renders without crashing', () => {
  //   const { getByText } = render(<SignInForm />);
  //   expect(getByText('Username')).toBeInTheDocument();
  //   expect(getByText('Password')).toBeInTheDocument();
  //   expect(getByText('Submit')).toBeInTheDocument();
  // });

  it('should sign in successfully', async () => {
    serviceRequest.mockImplementation(async () => (payLoad));
    const renderDom = render(<SignInForm />);
    const { container, baseElement } = renderDom;
    const usernameInput = container.querySelectorAll('input')[0];
    const passwordInput = container.querySelectorAll('input')[1];

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('testpassword');
    fireEvent.click(container.querySelector('button'));
    await new Promise((_) => setTimeout(_, 1000));
    expect(expect(baseElement.outerHTML).toBe('<body><div></div></body>'));
  });

  it('should fail to sign in for wrong credential', async () => {
    serviceRequest.mockImplementation(async () => { throw new Error('wrong'); });
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

  it('should fail to sign in, because of missing password', async () => {
    serviceRequest.mockImplementation(async () => (payLoad));
    const renderDom = render(<SignInForm />);
    const { container, getByText } = renderDom;
    const usernameInput = container.querySelectorAll('input')[0];

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.click(container.querySelector('button'));
    await new Promise((_) => setTimeout(_, 100));
    expect(getByText('this field is required')).toBeInTheDocument();
  });

  it('should fail to sign in, because of missing username', async () => {
    serviceRequest.mockImplementation(async () => (payLoad));
    const renderDom = render(<SignInForm />);
    const { container, getByText } = renderDom;
    const passwordInput = container.querySelectorAll('input')[1];

    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(container.querySelector('button'));
    await new Promise((_) => setTimeout(_, 100));
    expect(getByText('this field is required')).toBeInTheDocument();
  });
});
