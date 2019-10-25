import request from 'axios';

export async function serviceRequest(requestInfo) {
  try {
    // eslint-disable-next-line no-unused-vars
    const response = await request({ ...requestInfo, validateStatus: (_) => true });
    return response;
  } catch (err) {
    return err;
  }
}
