import { useChapterTextStyle } from "@/Hook/useChapterTextStyle";
import style from "./style.module.css";
import { ChapterController } from "@/Components/ChapterController";
import { ChapterContent } from "@/Components/ChapterContent";
import { useEffect, useRef, useState } from "react";
import { CustomizeChapterStyle } from "@/Components/CustomizeChapterStyle";
import { IChapter } from "@/types/chapter";
import { detectDoubleTapClosure } from "@/utils/detectDoubleTapClosure";
import { useQuery } from "react-query";
import { chapterApi } from "@/api/chapter-api";
import { Loading } from "@/Components/Loading";


interface IProps {
  chapterId:   string;
}

export const ChapterTemplate = ({ chapterId }: IProps) => {
  const { config, preview, changeConfig, changePreviewConfig } = useChapterTextStyle()
  const [showModal, setShowModal] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null);

  const [chapter, setChapter] = useState<IChapter>({} as IChapter)

  const { data, isLoading } = useQuery<{chapter: IChapter}>(
    ['chapter', chapterId], async () => await chapterApi.get({chapterId: chapterId as string})
  )

  useEffect(() => {
    if (!isLoading && data) {
      setChapter(data.chapter);
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

  if(isLoading){
    return <Loading />
  }

  if(!isLoading && !chapter){
    return <h1>Capítulo não encontrado!</h1>
  }
  
  return (
    <div className={style.layout}>
      <h1 className={style.title} style={{ fontFamily: config.fontFamily }}>
        {chapter.title}
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
    </div>
  )
}