import {boot} from 'quasar/wrappers';
import axios, {AxiosInstance} from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const APIURL = process.env.DEV ? 'http://localhost:8000/api/' : 'http://localhost:8000/api/';

const api = axios.create({baseURL: APIURL});

export default boot(({app}) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

api.interceptors.request.use(request => {
  const token = localStorage.getItem('token')
  if (token) {
    request.headers.common.Authorization = `jwt ${token}`
  }
  return request
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      throw error
    }
  }
)

export {api};
