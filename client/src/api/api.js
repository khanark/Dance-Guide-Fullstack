import { getUser } from '../util/util';

const host = 'http://localhost:3030';

const request = async (method, url, data) => {
  const options = {
    method,
    headers: {},
  };

  const userData = getUser();

  if (userData) {
    options.headers['x-authorization'] = userData.token;
  }

  if (data) {
    options.headers['content-type'] = 'application/json';
    options.body = JSON.stringify(data);
  }

  try {
    const res = await fetch(host + url, options);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const get = request.bind(null, 'GET');
const post = request.bind(null, 'POST');
const put = request.bind(null, 'PUT');
const patch = request.bind(null, 'PATCH');
const remove = request.bind(null, 'DELETE');

export { get, post, put, patch, remove };
