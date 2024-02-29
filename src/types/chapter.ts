export interface IChapter{
  id: string,
  title: string;
  content: string[],
  prev_chapter: string | null,
  next_chapter: string | null,
  createAt: string;
}