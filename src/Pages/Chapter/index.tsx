import { Layout } from "@/layout/Layout"
import style from './style.module.css';
import { useQuery } from "react-query";
import { useApi } from "@/Hook/useApi";
import { useNavigate, useParams } from "react-router-dom";
import { IChapter } from "@/types/chapter";
import { ChapterContent } from "@/Components/ChapterContent";
import { useEffect, useRef, useState } from "react";
import { CustomizeChapterStyle } from "@/Components/CustomizeChapterStyle";
import { detectDoubleTapClosure } from "@/utils/detectDoubleTapClosure";
import { ChapterController } from "@/Components/ChapterController";
import { useChapterTextStyle } from "@/Hook/useChapterTextStyle";

export const Chapter = () => {

  const api = useApi()
  const navigate = useNavigate()
  const {novelId, chapterId: currentChapterId} = useParams();
  const { config, preview, changeConfig, changePreviewConfig } = useChapterTextStyle()
  const contentRef = useRef<HTMLDivElement>(null)

  const [chapter, setChapter] = useState<IChapter | null>(null);
  const [showModal, setShowModal] = useState(false)


  const { data, isLoading } = useQuery<IChapter>(
    ['chapter', currentChapterId], () => api.getChapterPage(currentChapterId as string)
  )

  if (!currentChapterId || !isLoading && typeof data === 'undefined') {
    navigate(`/novel/${novelId}`)
  }


  useEffect(() => {
    if (!isLoading && data) {
      setChapter(data);
    }
  }, [data, isLoading])


  useEffect(() => {
    function showModal() {
      setShowModal(true)
    }

    const contentEl = contentRef.current

    const showModalInMobile = detectDoubleTapClosure(showModal);
    contentEl && contentEl.addEventListener('dblclick', showModal)

    if (contentEl) {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        contentEl.addEventListener('touchend', showModalInMobile, { passive: false });
      }
    }

    return () => {
      contentEl && contentEl.removeEventListener('touchend', showModalInMobile);
      contentEl && contentEl.removeEventListener('dblclick', showModal)
    }
  }, [chapter?.id])

  return (
    <Layout className={style.layout}>
      <h1 className={style.title} style={{ fontFamily: config.fontFamily }}>
        {chapter?.title ?? ''}
      </h1>

      <ChapterController nav={{ prev: chapter?.prev_chapter ?? null, next: chapter?.next_chapter ?? null }} />

      <ChapterContent
        ref={contentRef}
        config={!showModal ? config : preview}
        paragraphs={chapter?.content}
      />

      <ChapterController nav={{ prev: chapter?.prev_chapter ?? null, next: chapter?.next_chapter ?? null }} />

      {showModal && <CustomizeChapterStyle
        config={config}
        closeMenu={setShowModal}
        changeConfig={changeConfig}
        changeConfigPreview={changePreviewConfig}
      />}
    </Layout>
  )
}