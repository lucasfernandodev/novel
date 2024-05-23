import { useEffect, useState } from "react"


interface IPaginationPRops {
  size?: number,
  totalCount?: number
}

export const usePagination = ({ size = 6, totalCount = 0 }: IPaginationPRops) => {

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pages, setPages] = useState<number[]>([]);
  const [lastPage, setLastPage] = useState(Math.ceil(totalCount / 10))

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
    const lastPage = Math.ceil(totalCount / 10)
    setLastPage(lastPage)

    const tmparr = [];
    for (let i = 0; i <= lastPage; i++) {
      tmparr.push(i + 1)
    }
    setPages(tmparr)
  }, [totalCount])


  return {
    pages: pages.slice(0, size + 1),
    lastPage,
    changePage,
    currentPage,
  }
}