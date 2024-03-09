import axios from 'axios';
import { ILibraryNovel } from '../types/novel';

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

  logout: async () => {
    return new Promise((sucess) => {
      sucess({ status: true })
    })
  }
})