import request from 'request-promise-native';

export async function serviceRequest(method, uri, qs = null, headers = null, body = null) {
  try {
    const response = request({
      uri, headers, method, qs, body,
    });
    return response;
  } catch (err) {
    return err;
  }
}
