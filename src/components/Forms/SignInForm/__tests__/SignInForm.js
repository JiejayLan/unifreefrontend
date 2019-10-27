import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { SignInForm } from '../SignInForm';
import { serviceRequest } from '../../../../services/serviceRequest';

jest.mock('../../../../services/serviceRequest');

describe('SignInForm test', () => {
  beforeAll(() => {
    // Silence until testing-library fixed to use act()
    // eslint-disable-next-line no-console
    console.error = jest.fn();
  });

  beforeEach(() => {
    serviceRequest.mockClear();
  });

  it('renders without crashing', () => {
    const { getByText } = render(<SignInForm />);
    expect(getByText('Username')).toBeInTheDocument();
    expect(getByText('Password')).toBeInTheDocument();
    expect(getByText('Submit')).toBeInTheDocument();
  });

  it('should sign in successfully', async () => {
    const payLoad = {
      status: 'success',
      data: {
        username: 'test',
        token: '',
        updatedAt: '2019-10-15',
      },
    };
    serviceRequest.mockImplementation(async () => (payLoad));
    const renderDom = render(<SignInForm />);
    const { container } = renderDom;
    const usernameInput = container.querySelectorAll('input')[0];
    const passwordInput = container.querySelectorAll('input')[1];

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('testpassword');
    fireEvent.click(container.querySelector('button'));
  });

  it('should fail to sign in', () => {
    serviceRequest.mockImplementation(async () => { throw new Error(); });
    const renderDom = render(<SignInForm />);
    const { container, getByText } = renderDom;
    const usernameInput = container.querySelectorAll('input')[0];
    const passwordInput = container.querySelectorAll('input')[1];

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('testpassword');

    fireEvent.click(container.querySelector('button'));
    expect(getByText('Invalid username or password')).toBeInTheDocument();
  });
});
