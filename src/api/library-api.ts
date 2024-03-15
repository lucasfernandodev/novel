import { api, getErrorMessage } from "./configs/axios-config"

export interface ILibraryData{
  id: string;
  createdAt: string;
  updatedAt: string;
  novel: {
    id: string;
    title: string;
    thumbnail: string;
    slug: string;
  }
}

export const libraryApi = {
  getAll: async ({ userId }: { userId: string }): Promise<ILibraryData[] | []> => {
    try {
      const novels = await api.get(`/library/${userId}`);
      return novels.data.results
    } catch (error) {
      return getErrorMessage(error)
    }
  },

  isBookInLibrary: async ({ userId, novelId }: { userId: string, novelId: string }): Promise<{ isBookInLibrary: boolean }> => {
    try {
      const isBookInLibrary = await api.post("/library/novel", {
        userId,
        novelId
      })
      return isBookInLibrary.data
    } catch (error) {
      return getErrorMessage(error)
    }
  },

  add: async ({ userId, novelId }: { userId: string, novelId: string }) => {
    const response = await api.post('/library', {
      userId,
      novelId
    });

    return response.status === 201 ? true : false;
  },

  remove: async ({ userId, novelId }: { userId: string, novelId: string }) => {
    const respose = await api.delete("library", {
      data: {
        userId,
        novelId
      }
    })

    return respose.status === 204 ? true : false;
  }
}