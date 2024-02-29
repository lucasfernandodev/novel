import { useEffect, useState } from 'react';
import { IconOrderByOld, IconOrderByRecent, IconTrash } from '../../assets/icons';
import { Layout } from '../../layout/Layout';
import style from './style.module.css';
import { useQuery } from 'react-query';
import { useApi } from '../../Hook/useApi';
import { ILibraryNovel } from '../../types/novel';
import { Loading } from '../../Components/Loading';
import { generateSlug } from '../../utils/generateSlug';
import { Thumbnail } from '../../Components/Thumbnail';
import { useNavigate } from 'react-router-dom';



const EmptyLibrary = () => {
  return (
    <div className={style.withoutBook}>
      <img src="/library-empty.svg" alt="Ilustração de um homem segurando balões." />
      <p>Sua biblioteca está vazia!</p>
    </div>
  )
}

export const Library = () => {

  const api = useApi()
  const navigate = useNavigate()
  const [novels, setNovels] = useState<ILibraryNovel[]>([] as ILibraryNovel[])
  const [isSelected, setIsSelected] = useState(false);
  const [forRemoving, setForRemoving] = useState<string[]>([])
  const { isLoading, data } = useQuery('library-fetch', api.getLibraryContent)
  const [order, setOrder] = useState<'newest' | 'oldest'>("newest");

  useEffect(() => {
    if (!isLoading && data) {
      setNovels(data)
    }
  }, [data, isLoading])

  function toggleSelectedMode() {
    setIsSelected(!isSelected)
  }

  function setNovelForRemoving(novelId: string, command: 'add' | 'remove') {
    if (command === 'add') {
      setForRemoving(prev => ([...prev, novelId]))
    } else {
      const filtered = forRemoving.filter(id => id !== novelId);
      setForRemoving(filtered)
    }
  }

  function OpenNovelPage(url: string) {
    if (!isSelected) return navigate(url)
  }

  async function deleteNovelOfLibrary() {
    let listFiltered = novels;
    for (const novelId of forRemoving) {
      listFiltered = listFiltered.filter(novel => novel.id !== novelId)
      await api.removeBookForLibrary(novelId)
    }
    setNovels(listFiltered)
    setIsSelected(false)
    setForRemoving([])
  }

  function inverteOrdering() {
    setOrder(order === "newest" ? "oldest" : "newest")
    setNovels(([...novels.reverse()]))
  }

  return (
    <Layout className={style.layout} isPrivate={true}>
      <div className={style.container}>
        <div className={style.header}>
          <h2 className={style.title}>Biblioteca</h2>
          <div className={style.groupButtons}>
            <button onClick={inverteOrdering} disabled={novels.length === 0 ? true : false}>
              {order === "newest" ? <IconOrderByRecent /> : <IconOrderByOld />}
            </button>
            <button
              onClick={toggleSelectedMode}
              disabled={novels.length === 0 || isSelected ? true : false}
            >
              <IconTrash />
            </button>
          </div>
        </div>

        {isSelected && <div className={style.actions}>
          <button onClick={deleteNovelOfLibrary}>Remover Livros Selecionados</button>
          <button onClick={toggleSelectedMode}>Cancelar</button>
        </div>}

        <div className={style.wrapper}>
          {isLoading && <Loading />}
          {!isLoading && novels.length === 0 && <EmptyLibrary />}
          {!isLoading && novels.length > 0 && novels.map(novel => {
            const url = `/novel?id=${generateSlug(novel.title)}`
            return (
              <div
                data-selected={forRemoving.includes(novel.id) ? true : false}
                onClick={() => OpenNovelPage(url)}
                key={novel.id}
                className={style.grid__book}
              >
                <div className={style.container}>
                  {isSelected &&
                    <label htmlFor={novel.id} className={style.selectedContainer}>
                      <input
                        onChange={e => setNovelForRemoving(novel.id, e.currentTarget.checked ? 'add' : 'remove')}
                        type="checkbox" id={novel.id} />
                    </label>}
                  {<Thumbnail src={novel.avatarUrl} alt={novel.title} />}
                </div>
                <h3 className={style.title}>{novel.title}</h3>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}