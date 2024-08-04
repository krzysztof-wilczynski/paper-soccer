import axios, {AxiosResponse} from 'axios';
import {Notify} from 'quasar';

const API_URL = process.env.DEV ? 'http://localhost:8000/api/' : ''

enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  TooManyRequests = 429,
  InternalServerError = 500,
}

export type ApiError = { code: number, message: string }

const api = axios.create({baseURL: API_URL});
const handleError = (error: AxiosResponse) => {
  const {status, statusText} = error
  const parsedError: ApiError = {code: status, message: statusText}

  switch (status) {
    case StatusCode.InternalServerError: {
      // Handle InternalServerError
      break;
    }
    case StatusCode.Forbidden: {
      // Handle Forbidden
      break;
    }
    case StatusCode.Unauthorized: {
      // Handle Unauthorized
      break;
    }
    case StatusCode.TooManyRequests: {
      // Handle TooManyRequests
      break;
    }
    case StatusCode.NotFound: {
      parsedError.message = 'Nie znaleziono'
      break;
    }
    default: {
      break;
    }
  }

  Notify.create({type: 'negative', message: `${parsedError.code}: ${parsedError.message}`})
  return Promise.reject(parsedError);
}


api.interceptors.request.use(
  config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('access')}`
    return config
  }
)
api.interceptors.response.use(
  response => {
    return response
  },
  error => {
    const {response} = error;
    return handleError(response);
  }
)

export {api};
