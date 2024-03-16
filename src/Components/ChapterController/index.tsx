import style from './style.module.css';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IconList } from '@/assets/icons';
import { useMutation } from 'react-query';
import { IChapter } from '@/types/chapter';
import { Link } from '@/layout/Link';
import { chapterApi } from '@/api/chapter-api';

interface IProps {
  novelId: string,
  nav: {
    prev: string | null,
    next: string | null
  },
  chapterId: string
}


export const ChapterController: FC<IProps> = ({ nav, novelId, chapterId }) => {

  const navigate = useNavigate()
  const { slug } = useParams();
  const [prevChapter, setPrevChapter] = useState<string | null>(null);
  const [nextChapter, setNextChapter] = useState<string | null>(null);
  const [chapterList, setChapterList] = useState([])
  const [modaShow, setModalShow] = useState(false);

  const isButtonPrevDisabled = prevChapter !== null ? false : true;
  const isButtonNextDisabled = nextChapter !== null ? false : true;


  function toNext() {
    nextChapter && navigate(nextChapter)
  }

  function toBack() {
    prevChapter && navigate(prevChapter)
  }

  const { isLoading, data, mutate } = useMutation('modal-chapter-list',
    async () => await chapterApi.list({ novelId })
  );

  useEffect(() => {
    if (!isLoading && data) {
      setChapterList(data.results)
    }
  }, [data, isLoading])

  async function loadingChapters() {
    setModalShow(true)
    mutate()
  }

  function toggleVisibility(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    e.preventDefault()
    const modal = e.target as HTMLElement
    if (modal && typeof modal.dataset.root !== 'undefined') {
      setModalShow(false)
    }
  }

  useEffect(() => {
    if (nav) {
      setPrevChapter(nav.prev ? `/novel/${novelId}/chapter/${nav.prev}` : null);
      setNextChapter(nav.next ? `/novel/${novelId}/chapter/${nav.next}` : null);
    }
  }, [nav, novelId])

  return (
    <div className={style.chapterController}>
      {modaShow === true && <div onClick={toggleVisibility} data-root="true" className={style.modal}>
        <ul className={style.chapterList}>
          {chapterList && chapterList.map((ch: IChapter) => {
            const chapterUrl = `/novel/${slug}/chapter/${ch.id}`;
            const isCurrentChapter = ch.id === chapterId ? true : false
            return (
              <li key={ch.title}>
                <Link className={isCurrentChapter ? style.active : ''} to={chapterUrl}>{ch.title}</Link>
              </li>
            )
          })}
        </ul>
      </div>}
      <button disabled={isButtonPrevDisabled} onClick={toBack} className={style.btn}>
        Voltar
      </button>
      <button className={style.btn} onClick={loadingChapters}>
        <span><IconList /></span>
        <span>Capitulos</span>
      </button>
      <button disabled={isButtonNextDisabled} onClick={toNext} className={style.btn}>
        Proximo
      </button>
    </div>
  )
}