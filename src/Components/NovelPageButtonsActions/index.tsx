import { useEffect, useState } from 'react';
import { IconHeart } from '../../assets/icons';
import style from './style.module.css';

export const NovelPageButtonsActions = () => {
  const [showButtons, setShowwButtons] = useState(true);

  function addForLibrary(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const button = e.currentTarget as HTMLButtonElement;
    if (button.classList.contains(style.favorited)) {
      button.classList.remove(style.favorited)
    } else {
      button.classList.add(style.favorited)
    }
  }

  useEffect(() => {
    const toggleButtonsVisibility = () => {
      const scrollPositionY = window.pageYOffset;
      const alturaViewport = window.innerHeight;

      const alturaTotalDaPagina = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );

      const scrollPosition = scrollPositionY + alturaViewport;
      scrollPosition >= (alturaTotalDaPagina - 80) ?setShowwButtons(false) : setShowwButtons(true)
    }

    document.addEventListener('scroll', toggleButtonsVisibility, false)

    return () => {
      document.removeEventListener('scroll', toggleButtonsVisibility, false)
    }
  }, [])


  return (
    <div className={style.actions} data-show={showButtons}>
      <button>Começar a ler</button>
      <button onClick={addForLibrary}><IconHeart /></button>
    </div>
  )
}