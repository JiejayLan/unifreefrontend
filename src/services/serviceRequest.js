import request from 'axios';

export async function serviceRequest(requestInfo) {
  try {
    // eslint-disable-next-line no-unused-vars
    const response = await request({ ...requestInfo, validateStatus: (_) => true });
    const { data } = response;
    if (data && data.status === 'error') {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    console.log('catch error');
    throw err;
  }
}
