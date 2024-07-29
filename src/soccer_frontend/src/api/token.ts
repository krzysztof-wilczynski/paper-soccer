import { api } from 'boot/axios'

export const LoginUser = async (login: string, password: string) => {
  return await api.post('token/', {
    login, password
  })
}
