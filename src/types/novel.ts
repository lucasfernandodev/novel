export interface INovelChapter {
  id: string;
  title: string;
  position: string,
}

export interface INovel {
  slug: string;
  id: string,
  title: string,
  sinopse: string[],
  author: string
  main_genre: string,
  status: string,
  year: string,
  tags: string[],
  language: string,
  qtd_chapters: string,
  publisher: string,
  rating: string,
  thumbnail: string;
  chapters: INovelChapter[]
}

export interface ILibraryNovel{
  id: string;
  avatarUrl: string;
  title: string;
  updateAt: string;
  lastChapterId: string | null
}