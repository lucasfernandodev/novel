import { FC, useEffect, useState } from 'react';
import style from './style.module.css';
import { useNavigate } from 'react-router-dom';
import { IconList } from '@/assets/icons';

interface IProps {
  nav: {
    prev: string | null,
    next: string | null
  }
}


export const ChapterController: FC<IProps> = ({ nav }) => {

  const navigate = useNavigate()
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
      setPrevChapter(nav.prev ? `/chapter?id=${nav.prev}` : null);
      setNextChapter(nav.next ? `/chapter?id=${nav.next}` : null);
    }
  }, [nav])

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