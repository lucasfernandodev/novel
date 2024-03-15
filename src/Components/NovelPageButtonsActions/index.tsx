import { FC, useEffect, useState } from 'react';
import { IconHeart } from '../../assets/icons';
import style from './style.module.css';
import { INovel } from '../../types/novel';
import { useQuery } from 'react-query';
import { libraryApi } from '@/api/library-api';

interface IProps {
  novel: INovel,
  userId: string;
}

export const NovelPageButtonsActions: FC<IProps> = ({ novel, userId }) => {

  const [showButtons, setShowwButtons] = useState(true);
  const [isNovelAddedToLibrary, setIsNovelAddedToLibrary] = useState(false)

  const { isLoading, data } = useQuery('library-itens-fetch',
    () => libraryApi.isBookInLibrary({ userId: userId as string, novelId: novel.id })
  )

  useEffect(() => {
    if (!isLoading && data) {
      if (data.isBookInLibrary === true) {
        setIsNovelAddedToLibrary(true)
      }
    }
  }, [data, isLoading])

  async function addForLibrary(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const button = e.currentTarget as HTMLButtonElement;
    if (button.classList.contains(style.favorited)) {
      await libraryApi.remove({ userId: userId, novelId: novel.id })
      button.classList.remove(style.favorited)
    } else {
      await libraryApi.add({ userId: userId, novelId: novel.id })
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
      scrollPosition >= (alturaTotalDaPagina - 80) ? setShowwButtons(false) : setShowwButtons(true)
    }

    document.addEventListener('scroll', toggleButtonsVisibility, false)

    return () => {
      document.removeEventListener('scroll', toggleButtonsVisibility, false)
    }
  }, [])


  return (
    <div className={style.actions} data-show={showButtons}>
      <button>Começar a ler</button>
      <button
        className={isNovelAddedToLibrary ? style.favorited : ''}
        onClick={addForLibrary}
        aria-label='Adicionar novel biblioteca'
      >
        <IconHeart />
      </button>
    </div>
  )
}