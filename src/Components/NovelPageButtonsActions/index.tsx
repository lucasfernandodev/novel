import { FC, useEffect, useState } from 'react';
import { IconHeart } from '../../assets/icons';
import style from './style.module.css';
import { ILibraryNovel } from '../../types/novel';
import { useApi } from '../../Hook/useApi';
import { useQuery } from 'react-query';

interface IProps {
  novel: Omit<ILibraryNovel, 'id'>;
}

export const NovelPageButtonsActions: FC<IProps> = ({ novel }) => {

  const [showButtons, setShowwButtons] = useState(true);
  const [isNovelAddedToLibrary, setIsNovelAddedToLibrary] = useState(false)
  const api = useApi();
  
  const { isLoading, data } = useQuery('library-itens-fetch', api.getLibraryContent)

  useEffect(() => {
    if (!isLoading && data) {
      setIsNovelAddedToLibrary((data.filter(n => n.title === novel.title).length > 0) ? true : false)
    }
  }, [data, isLoading, novel])

  async function addForLibrary(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const button = e.currentTarget as HTMLButtonElement;
    if (button.classList.contains(style.favorited)) {
      const currentNovel = data?.filter(n => n.title === novel.title) as ILibraryNovel[]
      await api.removeBookForLibrary(currentNovel[0].id)
      button.classList.remove(style.favorited)
    } else {
      await api.addForLibrary(novel)
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