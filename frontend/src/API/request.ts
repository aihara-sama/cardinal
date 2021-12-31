import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000/api/v1';
axios.defaults.withCredentials = true;

type THttpMethods = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export const request = async (
  path: string,
  method: THttpMethods = 'GET',
  data: Record<string, any> = {},
) => {
  return axios(path, {
    method,
    data,
  })
    .then((response) => ({ data: response.data, error: null }))
    .catch((error) => ({ error: error.response.data, data: null }));
};
