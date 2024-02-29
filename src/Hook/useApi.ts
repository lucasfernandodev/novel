import axios from 'axios';
import { User as UserType } from '../types/user';
import { ILibraryNovel } from '../types/novel';

const USER: UserType = {
  id: '9a4cda5b-12b5-5e03-822a-7d33af73bcf0',
  name: 'Lucas Fernando',
  username: 'lucasfernandodev',
  avatarUrl: 'https://yt3.ggpht.com/7nd5nVYi8CrD1UpY2QR56VmvYyiNPSfo5M2tRTfYiEg40AQ_dl9X48NMOILG7M5xJqZ2mE2lCwQ=s88-c-k-c0x00ffffff-no-rj',
  email: 'exemplo@gmail.com',
}

export const APi = axios.create({
  baseURL: import.meta.env.REACT_APP_API,
})

export const useApi = () => ({
  getChapterPage: async (chapterId: string) => {
    const response = await axios.get(`http://192.168.1.5:3000/chapter/${chapterId}`);
    return response.data
  },
  removeBookForLibrary: async (novelLibraryId: string) =>{
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
  validateToken: async (token: string): Promise<{ user: UserType }> => {
    return new Promise((sucess) => {
      console.log(`Valdiate token, with target: ${token}`)
      sucess({
        user: USER,
      })
    })
  },

  signin: async (email: string, password: string): Promise<{ user: UserType, token: string }> => {
    return new Promise((sucess) => {
      console.log(`Login using email: ${email}, password: ${password}`)
      sucess({
        user: USER,
        token: 'd2791bfa-100b-5695-8607-821b0469bd2a'
      })
    })
  },

  logout: async () => {
    return new Promise((sucess) => {
      sucess({ status: true })
    })
  }
})