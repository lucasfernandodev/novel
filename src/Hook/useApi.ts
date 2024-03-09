import axios from 'axios';
import { User as UserType } from '../types/user';
import { ILibraryNovel } from '../types/novel';
import { jwtDecode } from "jwt-decode";

export const API = axios.create({
  baseURL: import.meta.env.REACT_APP_API || 'http://192.168.1.5:4000',
})

export interface ISignUp {
  avatar: string,
  name: string,
  email: string,
  password: string
}

export const useApi = () => ({
  getChapterPage: async (chapterId: string) => {
    const response = await axios.get(`http://192.168.1.5:3000/chapter/${chapterId}`);
    return response.data
  },
  removeBookForLibrary: async (novelLibraryId: string) => {
    const response = await axios.delete(`http://192.168.1.5:3000/library/${novelLibraryId}`);
    return response.data
  },
  addForLibrary: async (novel: Omit<ILibraryNovel, 'id'>): Promise<unknown> => {
    const response = await axios.post(`http://192.168.1.5:3000/library`, novel);
    return response.data
  },
  getLibraryContent: async (): Promise<ILibraryNovel[] | []> => {
    const response = await axios.get(`http://192.168.1.5:3000/library?_sort=-updateAt`);
    return response.data
  },

  validateToken: async (token: string): Promise<{ success: boolean } | null> => {
    try {
      const response = await API.post("/user/auth", {
        token
      })
      return response.data
    } catch (error) {
      return null
    }
  },

  signin: async (email: string, password: string): Promise<{ user: UserType, token: string } | null> => {
    try {
      const response = await API.post('/user/login', {
        email,
        password,
      })

      const { token: jwtToken } = response.data
      const { payload: user } = jwtDecode<{ payload: UserType }>(jwtToken);

      return {
        token: jwtToken,
        user: user
      }

    } catch (error) {
      return null
    }
  },

  signUp: async ({ avatar, name, email, password }: ISignUp): Promise<{ success: boolean, msg?: string }> => {
    try {
      const response = await API.post('/user', {
        avatar,
        name,
        email,
        password
      })

      return response.data
    } catch (error: unknown) {
      const { data } = error as { data: { msg: string, success: boolean } };
      console.log("CREATE USER ERROR", error)
      return data
    }
  },

  logout: async () => {
    return new Promise((sucess) => {
      sucess({ status: true })
    })
  }
})