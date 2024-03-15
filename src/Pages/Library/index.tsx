import style from './style.module.css';
import { useEffect, useState } from 'react';
import { IconOrderByOld, IconOrderByRecent, IconTrash } from '../../assets/icons';
import { Layout } from '../../layout/Layout';
import { useQuery } from 'react-query';
import { Loading } from '@components/Loading';
import { generateSlug } from '../../utils/generateSlug';
import { Thumbnail } from '@components/Thumbnail';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/Hook/useAuth';
import { User } from '@/types/user';
import { ILibraryData, libraryApi } from '@/api/library-api';



const EmptyLibrary = () => {
  return (
    <div className={style.withoutBook}>
      <img src="/library-empty.svg" alt="Ilustração de um homem segurando balões." />
      <p>Sua biblioteca está vazia!</p>
    </div>
  )
}

export const Library = () => {

  const { user } = useAuth() as { user: User }
  const navigate = useNavigate()
  const [novels, setNovels] = useState<ILibraryData[]>([] as ILibraryData[])
  const [isSelected, setIsSelected] = useState(false);
  const [forRemoving, setForRemoving] = useState<string[]>([])


  const { isLoading, data, refetch } = useQuery('library-fetch',
    async () => await libraryApi.getAll({ userId: user.id })
  )
  
  const [order, setOrder] = useState<'newest' | 'oldest'>("newest");

  useEffect(() => {
    if (!isLoading && data) {
      setNovels(data)
    }
  }, [data, isLoading]);

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
      await libraryApi.remove({ userId: user.id, novelId: novelId, })
    }

    setNovels(() => ({...listFiltered}))
    setIsSelected(false)
    setForRemoving([])
    refetch()
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
          {!isLoading && novels.length > 0 && novels.map(data => {
            const novel = data.novel
            const url = `/novel/${generateSlug(novel.title)}`
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
                  {<Thumbnail src={novel.thumbnail} alt={novel.title} />}
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