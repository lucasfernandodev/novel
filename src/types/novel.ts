export interface INovel {
  id: string,
  title: string,
  description: string,
  author: string
  main_genre: string,
  status: string,
  year: string,
  tags: string[],
  language: string,
  qtd_chapters: string,
  publisher: string,
  rating: string,
  avatarUrl: string;
}

export interface ILibraryNovel{
  id: string;
  avatarUrl: string;
  title: string;
  updateAt: string;
  lastChapterId: string | null
}