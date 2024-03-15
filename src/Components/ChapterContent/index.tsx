import style from './style.module.css';
import { HTMLAttributes, forwardRef, useEffect } from 'react';
import { Loading } from '../Loading';
import webfont from 'webfontloader'
import { IContent } from '@/types/chapter';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  paragraphs: IContent[] | undefined,
  config: {
    fontFamily: string,
    fontSize: number,
    lineHeight: number,
    gap: number
  }
}

export const ChapterContent = forwardRef<HTMLDivElement, IProps>(({ paragraphs, config }, ref) => {

  useEffect(() => {
    webfont.load({
      google: {
        families: [config.fontFamily.split(",")[0]]
      }
    });
   }, [config.fontFamily]);

  if(!paragraphs || !paragraphs && !config){
    return <Loading />
  }

  return (
    <div
      ref={ref}
      style={{
        fontFamily: config.fontFamily,
        gap: `${config.gap}px`
      }}
      className={style.content}
    >
      {paragraphs && paragraphs.map(content =>
        <p key={content.id} style={{
          fontSize: `${config.fontSize}px`,
          lineHeight: `${config.lineHeight}px`,
        }}>{content.paragraph}</p>
      )}
    </div>
  )
})
