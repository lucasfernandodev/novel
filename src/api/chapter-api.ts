import { api } from "./configs/axios-config"

export const chapterApi = {
  get: async ({ chapterId }: { chapterId: string }) => {
    const chapter = await api.get(`/chapter/${chapterId}`);
    return chapter.data
  },
  list: async ({ novelId }: { novelId: string }) => {
    const results = await api.get(`/chapter/all/${novelId}`);
    return results.data
  }
}