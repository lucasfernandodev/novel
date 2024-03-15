import { api } from "./configs/axios-config"

export const chapterApi = {
  get: async ({ chapterId }: { chapterId: string }) => {
    const chapter = await api.get(`/chapter/${chapterId}`);
    return chapter.data
  }
}