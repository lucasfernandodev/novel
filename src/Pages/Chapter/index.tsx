import { Layout } from "@/layout/Layout"
import style from './style.module.css';
import { useQuery } from "react-query";
import { useApi } from "@/Hook/useApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IChapter } from "@/types/chapter";
import { ChapterContent } from "@/Components/ChapterContent";
import { useEffect, useState } from "react";
import { IconList } from "@/assets/icons";
import { Loading } from "@/Components/Loading";

export const Chapter = () => {

  const api = useApi()
  const navigate = useNavigate()
  const [search,] = useSearchParams();
  const [prevChapter, setPrevChapter] = useState<string | null>(null);
  const [nextChapter, setNextChapter] = useState<string | null>(null);
  const [chapter, setChapter] = useState<IChapter | null>(null);

  const isButtonPrevDisabled = prevChapter !== null ? false : true;
  const isButtonNextDisabled = nextChapter !== null  ? false : true;

  function toNext() {
    nextChapter && navigate(nextChapter)
  }

  function toBack() {
    prevChapter && navigate(prevChapter)
  }

  const [config, setConfig] = useState({
    fontFamily: 'Roboto, sans-serif',
    fontSize: 16,
    lineHeight: 28,
    gap: 16
  })

  const { data, isLoading } = useQuery<IChapter>(
    ['chapter', search.get("id") as string], () => api.getChapterPage(search.get("id") as string)
  )


  useEffect(() => {
    if (!isLoading && data) {
      setChapter(data);
      setPrevChapter(data.prev_chapter ? `/chapter?id=${data.prev_chapter}`: null);
      setNextChapter(data.next_chapter ? `/chapter?id=${data.next_chapter}`: null);
    }
  }, [data, isLoading])


  return (
    <Layout className={style.layout}>
      <h1 className={style.title}
        style={{ fontFamily: config.fontFamily }}
      >
        {chapter?.title ?? 'Chapter'}
      </h1>
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


      {isLoading && <Loading />}
      {!isLoading && chapter !== null && <ChapterContent config={config} paragraphs={chapter.content} />}


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
    </Layout>
  )
}