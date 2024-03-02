import { Layout } from "@/layout/Layout"
import style from './style.module.css';
import { useQuery } from "react-query";
import { useApi } from "@/Hook/useApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IChapter } from "@/types/chapter";
import { ChapterContent } from "@/Components/ChapterContent";
import { useEffect, useRef, useState } from "react";
import { CustomizeChapterStyle } from "@/Components/CustomizeChapterStyle";
import { detectDoubleTapClosure } from "@/utils/detectDoubleTapClosure";
import { ChapterController } from "@/Components/ChapterController";

export const Chapter = () => {

  const api = useApi()
  const navigate = useNavigate()
  const [search,] = useSearchParams();
  const currentChapterId = search.get('id')
  const ref = useRef<HTMLDivElement>(null)

  if (!search.get('id')) {
    navigate("/")
  }



  const [chapter, setChapter] = useState<IChapter | null>(null);
  const [showModal, setShowModal] = useState(false)



  const [config, setConfig] = useState({
    fontFamily: 'Roboto, sans-serif',
    fontSize: 16,
    lineHeight: 28,
    gap: 16
  })

  const { data, isLoading } = useQuery<IChapter>(
    ['chapter', currentChapterId as string], () => api.getChapterPage(currentChapterId as string)
  )


  useEffect(() => {
    if (!isLoading && data) {
      setChapter(data);
    }
  }, [data, isLoading])

  useEffect(() => {
    function showModal() {
      setShowModal(true)
    }

    const contentEl = ref.current

    contentEl && contentEl.addEventListener('dblclick', showModal)


    return () => {
      contentEl && contentEl.removeEventListener('dblclick', showModal)
    }
  }, [])

  function changeFontFamily(font: string) {
    setConfig(prev => ({
      ...prev,
      fontFamily: font
    }))
  }

  function changeFontSize(size: number) {
    setConfig(prev => ({
      ...prev,
      fontSize: size
    }))
  }

  function changeLineHeight(lineHeight: number) {
    setConfig(prev => ({
      ...prev,
      lineHeight: lineHeight
    }))
  }

  function changeGap(gap: number) {
    setConfig(prev => ({
      ...prev,
      gap: gap
    }))
  }

  useEffect(() => {
    function showModal() {
      setShowModal(true)
    }
    const contentEl = ref.current

    const showModalInMobile = detectDoubleTapClosure(showModal)

    if (contentEl) {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        contentEl.addEventListener('touchend', showModalInMobile, { passive: false });
      }
    }

    return () => {
      contentEl && contentEl.removeEventListener('touchend', showModalInMobile);
    }
  }, [chapter?.id])

  return (
    <Layout className={style.layout}>
      <h1 className={style.title}
        style={{ fontFamily: config.fontFamily }}
      >
        {chapter?.title ?? 'Chapter'}
      </h1>

      <ChapterController nav={{ prev: chapter?.prev_chapter ?? null, next: chapter?.next_chapter ?? null }} />

      <ChapterContent ref={ref} config={config} paragraphs={chapter?.content} />

      <ChapterController nav={{ prev: chapter?.prev_chapter ?? null, next: chapter?.next_chapter ?? null }} />

      {showModal && <CustomizeChapterStyle
        changeGap={changeGap}
        changeFontFamily={changeFontFamily}
        changeFontSize={changeFontSize}
        changeLineHeight={changeLineHeight}
        closeMenu={setShowModal}
      />}
    </Layout>
  )
}