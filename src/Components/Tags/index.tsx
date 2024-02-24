import { FC } from 'react';
import style from './style.module.css';

interface IProps {
  tags: string[]
}
export const Tags: FC<IProps> = ({ tags }) => {

  if(!tags) return null;
  
  return (
    <div className={style.tags}>
      <h3 className={style.title}>Tags</h3>
      <div className={style.content}>
        {tags.length !== 0 && tags.map(t => <span>#{t}</span>)}
      </div>
    </div>
  )
}