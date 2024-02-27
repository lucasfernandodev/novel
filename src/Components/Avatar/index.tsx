import { FC, HTMLAttributes } from 'react';
import style from './style.module.css';
import { IconUser } from '../../assets/icons';

interface IProps extends HTMLAttributes<HTMLElement> {
  src: string,
  alt: string,
  width?: number,
  height?: number
}

export const Avatar: FC<IProps> = ({ src, alt, width, height, ...rest }) => {

  function onError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
    e.currentTarget.style.display = 'block';
    e.currentTarget.setAttribute('data-loader', 'true');
  }

  return (
    <div className={style.wrapper}
      style={{ width: `${width}px`, height: `${height}px` }}
      {...rest}
    >
      <img src={src} alt={alt} onLoad={onError} />
      <IconUser />

    </div>
  )
}