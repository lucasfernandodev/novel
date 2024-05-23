import style from './style.module.css';
import { HTMLAttributes, forwardRef, useEffect } from 'react';
import { Loading } from '../Loading';
import webfont from 'webfontloader'
import { IContent } from '@/types/chapter';
import { ITextStyleConfig } from "@/types/text-style-config"


interface IProps extends HTMLAttributes<HTMLDivElement> {
  paragraphs: IContent[] | undefined,
  config: ITextStyleConfig
}

export const ChapterContent = forwardRef<HTMLDivElement, IProps>(({ paragraphs, config }, ref) => {

  useEffect(() => {
    const fontFamily = config.fontFamily.split(",")[0]
    webfont.load({ google: { families: [fontFamily] } });
  }, [config.fontFamily]);

  if (!paragraphs || !paragraphs && !config) {
    return <Loading />
  }

  const customStyles = {
    family: config.fontFamily,
    gap: `${config.gap}px`,
    size: `${config.fontSize}px`,
    lineHeight: `${config.lineHeight}px`
  }

  const containerStyle = {
    fontFamily: customStyles.family,
    gap: customStyles.gap
  }

  const paragraphStyle = {
    fontSize: customStyles.size,
    lineHeight: customStyles.lineHeight,
  }

  return (
    <div ref={ref} style={containerStyle} className={style.content} >
      {paragraphs && paragraphs.map(content =>
        <p key={content.id} style={paragraphStyle} >
          {content.paragraph}
        </p>
      )}
    </div>
  )
})
