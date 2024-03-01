import { FC, HTMLAttributes } from 'react';
import style from './style.module.css';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  paragraphs: string[],
  config: {
    fontFamily: string,
    fontSize: number,
    lineHeight: number,
    gap: number
  }
}

export const ChapterContent: FC<IProps> = ({ paragraphs, config }) => {
  return (
    <div
      style={{
        fontFamily: config.fontFamily,
        gap: `${config.gap}px`
      }}
      className={style.content}
    >
      {paragraphs.map((paragraph, index) =>
        <p key={index} style={{
          fontSize: `${config.fontSize}px`,
          lineHeight: `${config.lineHeight}px`,
        }}>{paragraph}</p>
      )}
    </div>
  )
}