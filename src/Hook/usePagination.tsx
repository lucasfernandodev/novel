import { INovelChapter } from "@/types/novel";
import { useEffect, useState } from "react"


interface IPaginationPRops {
  chapters: INovelChapter[];
  orderBy?: 'newest' | 'oldest',
  size?: number,
}

export const usePagination = ({ chapters = [], orderBy = 'oldest', size = 6 }: IPaginationPRops) => {
  const [data, setData] = useState<INovelChapter[]>(orderBy === 'newest' ? chapters.reverse() : chapters || [])
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pages, setPages] = useState<number[]>([]);
  const [lastPage, setLastPage] = useState((chapters.length / 10))
  const [order, setOrder] = useState<'newest' | 'oldest'>(orderBy)

  function toggleOrder() {
    setOrder(order === 'newest' ? 'oldest' : 'newest');
    setData(data.reverse())
  }


  function changePage(indicator: number, index: number | null) {

    if (index == size && indicator < (lastPage - 1)) {
      const moveNext = pages.map(i => i + 1);

      setCurrentPage(indicator)
      setPages(moveNext)
      return;
    }

    if (index === 0 && indicator > 1) {
      const moveBack = pages.map(i => i - 1);

      setCurrentPage(indicator)
      setPages(moveBack)
      return;
    }

    if (index !== null && index < (size + 1) || indicator === lastPage && index === null) {
      setCurrentPage(indicator)
    }
  }

  useEffect(() => {

    setData(chapters)
    setLastPage((chapters.length / 10))

    const tmparr = [];
    for (let i = 0; i < (chapters.length / 10); i++) {
      tmparr.push(i + 1)
    }
    setPages(tmparr)
  }, [chapters])


  return {
    pages: pages.slice(0, size + 1),
    lastPage,
    changePage,
    currentPage,
    chapters: data.slice((currentPage * 10) - 10, (currentPage * 10)),
    toggleOrder,
    order
  }
}