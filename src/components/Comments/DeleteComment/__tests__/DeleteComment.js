import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { serviceRequest } from '../../../../services/serviceRequest';
import { DeleteComment } from '../DeleteComment';

jest.mock('../../../../services/serviceRequest');

const successPayLoad = {
  status: 'success',
  data: [1],
};

describe('Delete comment test suite', () => {
  beforeAll(() => {
    // eslint-disable-next-line no-console
    console.error = jest.fn();
  });

  beforeEach(() => {
    serviceRequest.mockClear();
  });

  it('should edit post successfully', async () => {
    serviceRequest.mockImplementation(async () => (successPayLoad));
    const { getByText, container } = render(
      <DeleteComment commentID={123} />,
    );
    fireEvent.click(container.querySelector('.MuiButton-root'));
    expect(getByText('Are you sure you want to delete this comment?')).toBeInTheDocument();
  });
});
