import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SignUpForm } from '../SignUpForm';
import { serviceRequest } from '../../../../services/serviceRequest';

jest.mock('../../../../services/serviceRequest');
jest.setTimeout(3000);

describe('SignUpForm Test Suite', () => {
  const successPayload = {
    status: 'success',
    data: {
      email: 'test@test.edu',
      username: 'test',
      token: 1234,
      createdAt: new Date().toString(),
    },
  };

  const failPayload = {
    status: 'error',
    data: {
      email: 'test@test.edu',
      username: 'test',
      token: '',
      createdAt: new Date().toString(),
    },
  };
  beforeAll(() => {
    serviceRequest.mockImplementation(async () => (successPayload));
  });

  beforeEach(() => {
    serviceRequest.mockClear();
  });

  it('Should sign up users successfully', async () => {
    const renderDom = render(<SignUpForm />);
    const { container, baseElement } = renderDom;
    const emailInput = container.querySelectorAll('input')[0];
    const usernameInput = container.querySelectorAll('input')[1];
    const passwordInput = container.querySelectorAll('input')[2];
    fireEvent.change(emailInput, { target: { value: 'test@test.edu' } });
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(container.querySelector('button'));
    await new Promise((x) => setTimeout(x, 100));
    expect(expect(baseElement.outerHTML).toBe('<body><div></div></body>'));
  });

  it('Should catch error for wrong credential', async () => {
    serviceRequest.mockReturnValue(failPayload);
    const renderDom = render(<SignUpForm />);
    const { container, getByText } = renderDom;
    const emailInput = container.querySelectorAll('input')[0];
    const usernameInput = container.querySelectorAll('input')[1];
    const passwordInput = container.querySelectorAll('input')[2];

    fireEvent.change(emailInput, { target: { value: 'test@test.edu' } });
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(container.querySelector('button'));
    await new Promise((x) => setTimeout(x, 100));
    expect(getByText('Invalid email, username or password')).toBeInTheDocument();
  });

  it('Should catch error for internal service error', async () => {
    serviceRequest.mockReturnValue({});
    const renderDom = render(<SignUpForm />);
    const { container, getByText } = renderDom;
    const emailInput = container.querySelectorAll('input')[0];
    const usernameInput = container.querySelectorAll('input')[1];
    const passwordInput = container.querySelectorAll('input')[2];

    fireEvent.change(emailInput, { target: { value: 'test@test.edu' } });
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(container.querySelector('button'));
    await new Promise((x) => setTimeout(x, 100));
    expect(getByText('Internal Service Error')).toBeInTheDocument();
  });

  it('should fail to sign up due to missing email', async () => {
    serviceRequest.mockReturnValue(failPayload);
    const renderDom = render(<SignUpForm />);
    const { container } = renderDom;
    const usernameInput = container.querySelectorAll('input')[1];
    const passwordInput = container.querySelectorAll('input')[2];

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(container.querySelector('button'));
    await new Promise((x) => setTimeout(x, 100));
    expect(serviceRequest).not.toHaveBeenCalled();
  });

  it('Should fail to sign up due to missing username', async () => {
    serviceRequest.mockReturnValue(failPayload);
    const renderDom = render(<SignUpForm />);
    const { container } = renderDom;
    const emailInput = container.querySelectorAll('input')[0];
    const passwordInput = container.querySelectorAll('input')[2];

    fireEvent.change(emailInput, { target: { value: 'test@test.edu' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(container.querySelector('button'));
    await new Promise((x) => setTimeout(x, 100));
    expect(serviceRequest).not.toHaveBeenCalled();
  });

  it('Should fail to sign up due to missing password', async () => {
    serviceRequest.mockReturnValue(failPayload);
    const renderDom = render(<SignUpForm />);
    const { container } = renderDom;
    const emailInput = container.querySelectorAll('input')[0];
    const usernameInput = container.querySelectorAll('input')[1];

    fireEvent.change(emailInput, { target: { value: 'test@test.edu' } });
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.click(container.querySelector('button'));
    await new Promise((x) => setTimeout(x, 100));
    expect(serviceRequest).not.toHaveBeenCalled();
  });
});
