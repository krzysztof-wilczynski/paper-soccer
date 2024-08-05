import {api} from 'src/api/apiClient';
import * as DTO from 'src/components/models'

export const LoginUser = async (credentials: DTO.LoginCredentials) => {
  try {
    const response = await api.post('token/', {
      username: credentials.login,
      password: credentials.password
    });
    return await response.data;
  } catch (e) {
    return ({});
  }
}

export const getPlayerInfo = async (nickname: string = ''): Promise<DTO.PlayerInfoResponse | null> => {
  try {
    const response = await api
      .get(`core/player/${nickname}`);
    return await response.data;
  } catch (e) {
    return null;
  }
}
