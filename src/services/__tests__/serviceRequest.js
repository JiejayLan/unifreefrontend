import request from 'axios';
import { serviceRequest } from '../serviceRequest';

jest.mock('axios');

const payLoad = { method: 'get', data: null, url: 'goold.com' };

describe('User service test suite', () => {
  beforeEach(() => {
    request.mockClear();
  });

  it('Should request api service', async () => {
    request.mockReturnValue({ data: { status: 'success' } });
    const response = await serviceRequest(payLoad);
    expect(response.status).toBe('success');
  });

  it('Should catch any error', async () => {
    try {
      request.mockImplementation(async () => { throw new Error('Internal Server Error'); });
      await serviceRequest(payLoad);
    } catch (err) {
      expect(err.message).toBe('Internal Server Error');
    }
  });
});
