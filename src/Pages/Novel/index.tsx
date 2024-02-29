import style from './style.module.css';
import { Layout } from '../../layout/Layout';
import { Thumbnail } from '@components/Thumbnail';
import { IconFlag, IconInfo } from '../../assets/icons';
import { Sinopse } from '@components/Sinopse';
import { GridBooksRecomendations } from '@components/GridBooksRecomendations';
import { ToggleTabButton } from '@components/ToggleTabButton';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { generateSlug } from '../../utils/generateSlug';
import { NovelPageButtonsActions } from '@components/NovelPageButtonsActions';
import { ModalBottom } from '@components/ModalBottom';
import { INovel } from '../../types/novel';
import { FullBookDetails } from '@components/FullBookDetails';
import { Tags } from '@components/Tags';
import { TableChapterContent } from '@components/TableChapterContent';

const SectionAbout = ({ sinopse, tags }: { sinopse: string, tags: string[] }) => {
  return (
    <section className={style.about}>
      <Sinopse>
        <p>{sinopse}</p>
      </Sinopse>
      <Tags tags={tags} />
      <GridBooksRecomendations />
    </section>
  )
}

export const Novel = () => {

  const [search,] = useSearchParams();
  const [tab, setTab] = useState<'about' | 'chapters'>('about')
  const [data, setData] = useState({} as INovel);
  const [showBottomModal, setShowBottomModal] = useState(false);

  useEffect(() => {
    async function getNovel() {
      const req = await fetch('http://192.168.1.5:3000/novels');
      const list = await req.json() as INovel[]

      if (list.length > 0) {
        for (const novel of list) {
          const currentSlug = generateSlug(novel.title);
          if (currentSlug === search.get('id')) {
            setData(novel); break;
          }
        }
      }
    }

    getNovel().catch(console.error)
  }, [search])


  function toggleModalVisibility() {
    setShowBottomModal(!showBottomModal)
  }

  return (
    <Layout className={style.novel}>
      <header>

        <div className={style.bookCover}>
          <div className={style.thumbnail}>
            <Thumbnail src={data.avatarUrl} alt={data.title} />
          </div>
          <div className={style.bookDetails}>
            <div className={style.row}>
              <span className={style.mainFeatures}>{data.main_genre}</span>
              <h3 className={style.title}>{data.title}</h3>
              <p className={style.author}>{data.author}</p>
            </div>
            <div className={style.row}>
              <div>
                <span className={style.status}>{data.status}</span>
                <span className={style.divider}></span>
                <span className={style.year}>{data.year}</span>
              </div>
              <button onClick={toggleModalVisibility}><IconInfo /></button>
            </div>
          </div>
        </div>

        <NovelPageButtonsActions
          novel={{
            avatarUrl: data.avatarUrl,
            title: data.title,
            lastChapterId: null,
            updateAt: (new Date()).toISOString()
          }
          } />

        <ToggleTabButton changeTab={setTab} />

        {data && showBottomModal &&
          <ModalBottom className={style.modal} isShow={showBottomModal} hiddenModal={setShowBottomModal}>
            <FullBookDetails data={data} />
            <button className={style.report}>
              <span><IconFlag /></span>
              <span>Reportar</span>
            </button>
          </ModalBottom>}
      </header>
      <main>
        {tab === 'about' && <SectionAbout sinopse={data.description} tags={data.tags} />}

        {tab === 'chapters' &&
          <section className={style.chapthers}>
            <TableChapterContent />
          </section>
        }
      </main>
    </Layout >
  )
}