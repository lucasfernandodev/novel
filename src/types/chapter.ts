export interface IContent {
  id: string;
  paragraph: string;
}

export interface IChapter{
  id: string,
  title: string;
  position: number;
  content: IContent[],
  prev_chapter: string | null,
  next_chapter: string | null,
  createdAt: string;
  updatedAt: string
}