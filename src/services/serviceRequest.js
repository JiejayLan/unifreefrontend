import request from 'axios';

export const serviceRequest = async (requestInfo) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // eslint-disable-next-line no-unused-vars
    const response = await request({ ...requestInfo, validateStatus: (_) => true });
    const { data } = response;
    return data;
  } catch (err) {
    throw err;
  }
};
