import { useChapterTextStyle } from "@/Hook/useChapterTextStyle";
import style from "./style.module.css";
import { ChapterController } from "@/Components/ChapterController";
import { ChapterContent } from "@/Components/ChapterContent";
import { useEffect, useRef, useState } from "react";
import { CustomizeChapterStyle } from "@/Components/CustomizeChapterStyle";
import { IChapter } from "@/types/chapter";
import { detectDoubleTapClosure } from "@/utils/detectDoubleTapClosure";


interface IProps {
  chapter: IChapter;
}

export const ChapterTemplate = ({ chapter }: IProps) => {
  const { config, preview, changeConfig, changePreviewConfig } = useChapterTextStyle()
  const [showModal, setShowModal] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null);



  useEffect(() => {
    function showModal() {
      setShowModal(true)
    }

    const contentEl = contentRef.current

    const showModalInMobile = detectDoubleTapClosure(showModal);
    contentEl && contentEl.addEventListener('dblclick', showModal)

    if (contentEl) {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        contentEl.addEventListener('touchend', (event) => {
          showModalInMobile(event, 150)
        }, { passive: false });
      }
    }

    return () => {
      contentEl && contentEl.removeEventListener('touchend', showModalInMobile);
      contentEl && contentEl.removeEventListener('dblclick', showModal)
    }
  }, [chapter?.id])



  return (
    <div className={style.layout}>
      <h1 className={style.title} style={{ fontFamily: config.fontFamily }}>
        {chapter.title}
      </h1>

      <ChapterController
        novelId={chapter.novelId}
        chapterId={chapter.id}
        nav={{ prev: chapter?.prev_chapter ?? null, next: chapter?.next_chapter ?? null }}
      />

      <ChapterContent
        ref={contentRef}
        config={!showModal ? config : preview}
        paragraphs={chapter?.content}
      />

      <ChapterController
        chapterId={chapter.id}
        novelId={chapter.novelId}
        nav={{ prev: chapter?.prev_chapter ?? null, next: chapter?.next_chapter ?? null }}
      />

      {showModal && <CustomizeChapterStyle
        config={config}
        closeMenu={setShowModal}
        changeConfig={changeConfig}
        changeConfigPreview={changePreviewConfig}
      />}
    </div>
  )
}