import style from './style.module.css';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IconList } from '@/assets/icons';
import { useMutation } from 'react-query';
import { IChapter } from '@/types/chapter';
import { Link } from '@/layout/Link';

interface IProps {
  nav: {
    prev: string | null,
    next: string | null
  }
}


export const ChapterController: FC<IProps> = ({ nav }) => {

  const navigate = useNavigate()
  const { novelId } = useParams()
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

  async function exec() {
    const response = await fetch('http://192.168.1.5:3000/chapters');
    const data = response.json();
    return data;
  }

  const { isLoading, data, mutate } = useMutation('loading', exec);

  useEffect(() => {
    if (!isLoading && data) {
      setChapterList(data)
    }
  }, [data, isLoading])

  async function loadingChapters() {
    setModalShow(true)
    mutate()
  }

  function toggleVisibility(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    e.preventDefault()
    console.log(e.target)
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
            return (
              <li key={ch.title}>
                <Link to={`/novel/${novelId}/chapter/${ch.id}`}>{ch.title}</Link>
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