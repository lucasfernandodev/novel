import React, { HTMLAttributes } from 'react';
import style from './style.module.css';

interface IThumbnailProps extends HTMLAttributes<HTMLImageElement>{
  alt: string,
  src: string,
}

export const Thumbnail: React.FC<IThumbnailProps> = ({src, ...rest}) => {
  function handleError(e: React.SyntheticEvent<HTMLImageElement, Event>){
    const image = e.target as HTMLImageElement;
    image.classList.add(style.fallback)
    image.onerror = null;
    image.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJpY29uIGljb24tdGFibGVyIGljb24tdGFibGVyLWJvb2siIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlPSIjZmZmIiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIHN0cm9rZT0ibm9uZSIgZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0zIDE5YTkgOSAwIDAgMSA5IDBhOSA5IDAgMCAxIDkgMCIgLz48cGF0aCBkPSJNMyA2YTkgOSAwIDAgMSA5IDBhOSA5IDAgMCAxIDkgMCIgLz48cGF0aCBkPSJNMyA2bDAgMTMiIC8+PHBhdGggZD0iTTEyIDZsMCAxMyIgLz48cGF0aCBkPSJNMjEgNmwwIDEzIiAvPjwvc3ZnPg=="
  }

  return (
    <div className={style.thumbnail}>
        <img {...rest} className={[style.img, rest.className].join(" ")}  src={src} onError={handleError}/>
    </div>
  )
}