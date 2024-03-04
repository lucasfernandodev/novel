import style from './style.module.css';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IconList } from '@/assets/icons';

interface IProps {
  nav: {
    prev: string | null,
    next: string | null
  }
}


export const ChapterController: FC<IProps> = ({ nav }) => {

  const navigate = useNavigate()
  const {novelId} = useParams()
  const [prevChapter, setPrevChapter] = useState<string | null>(null);
  const [nextChapter, setNextChapter] = useState<string | null>(null);

  const isButtonPrevDisabled = prevChapter !== null ? false : true;
  const isButtonNextDisabled = nextChapter !== null ? false : true;

  function toNext() {
    nextChapter && navigate(nextChapter)
  }

  function toBack() {
    prevChapter && navigate(prevChapter)
  }

  useEffect(() => {
    if (nav) {
      setPrevChapter(nav.prev ? `/novel/${novelId}/chapter/${nav.prev}` : null);
      setNextChapter(nav.next ? `/novel/${novelId}/chapter/${nav.next}` : null);
    }
  }, [nav, novelId])

  return (
    <div className={style.chapterController}>
      <button disabled={isButtonPrevDisabled} onClick={toBack} className={style.btn}>
        Voltar
      </button>
      <button className={style.btn}>
        <span><IconList /></span>
        <span>Capitulos</span>
      </button>
      <button disabled={isButtonNextDisabled} onClick={toNext} className={style.btn}>
        Proximo
      </button>
    </div>
  )
}