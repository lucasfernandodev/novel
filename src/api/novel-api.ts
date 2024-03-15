import { INovel } from "@/types/novel";
import { api, getErrorMessage } from "./configs/axios-config"

interface IGetAllProps {
  order?: 'new' | 'rated',
  limit?: number
}

export interface IResumeNovel extends Pick<INovel, 'id' | 'slug' | 'thumbnail' | 'title' | 'rating' | 'author'> { }

export const novelApi = {
  get: async ({ slug }: { slug: string }): Promise<INovel | null> => {
    try {
      const novel = await api.get(`/novel/${slug}`);
      return novel.data.novel;
    } catch (error) {
      return getErrorMessage(error)
    }
  },

  getAll: async ({ order = 'new', limit = 10 }: IGetAllProps): Promise<IResumeNovel[] | []> => {
    try {
      const novels = await api.get(`/novel/?by=${order}&limit=${limit}`);
      return novels.data.result;
    } catch (error) {
      return getErrorMessage(error)
    }
  }
}