import { api, getErrorMessage } from './configs/axios-config';
import { jwtDecode } from 'jwt-decode';
import { User } from '@/types/user';

interface ISignUpProps {
  avatar: string;
  name: string;
  email: string;
  password: string;
}

interface ISignInProps {
  email: string;
  password: string;
}



export const userAPI = {
  signUp: async ({ avatar, email, name, password }: ISignUpProps) => {
    try {
      const isSucess = await api.post('/user', {
        avatar,
        email,
        name,
        password
      });

      return isSucess.data
    } catch (error) {
      return getErrorMessage(error)
    }
  },

  signIn: async ({ email, password }: ISignInProps) => {
    try {
      const result = await api.post('/user/login', { email, password });
      const { payload } = jwtDecode<{ payload: User }>(result.data.token);
      return {
        success: result.data.sucess,
        token: result.data.token,
        user: payload
      }
    } catch (error) {
      return getErrorMessage(error)
    }
  },



  validateToken: async ({ token }: { token: string }) => {
    try {
      const response = await api.post("/user/auth", { token });
      return response.data;
    } catch (error) {
      getErrorMessage(error)
    }
  }
}