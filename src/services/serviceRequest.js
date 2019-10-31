import request from 'axios';

export async function serviceRequest(requestInfo) {
  try {
    // eslint-disable-next-line no-unused-vars
    const response = await request({ ...requestInfo });
    const { data } = response;
    return data;
  } catch (err) {
    throw err;
  }
}
