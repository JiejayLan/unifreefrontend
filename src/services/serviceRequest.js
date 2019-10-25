import request from 'request-promise-native';

export async function serviceRequest(requestInfo) {
  try {
    const response = request(requestInfo);
    return response;
  } catch (err) {
    return err;
  }
}
