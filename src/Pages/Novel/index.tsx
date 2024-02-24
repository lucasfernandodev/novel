import { Layout } from '../../Components/Layout';
import { Thumbnail } from '../../Components/Thumbnail';
import { IconFlag, IconInfo } from '../../assets/icons';
import style from './style.module.css';
import { Sinopse } from '../../Components/Sinopse';
import { GridBooksRecomendations } from '../../Components/GridBooksRecomendations';
import { ToggleTabButton } from '../../Components/ToggleTabButton';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { generateSlug } from '../../utils/generateSlug';
import { NovelPageButtonsActions } from '../../Components/NovelPageButtonsActions';
import { ModalBottom } from '../../Components/ModalBottom';
import { INovel } from '../../types/novel';
import { FullBookDetails } from '../../Components/FullBookDetails';
import { Tags } from '../../Components/Tags';
import { TableChapterContent } from '../../Components/TableChapterContent';



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
            <Thumbnail src="" alt="" />
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

        <NovelPageButtonsActions />

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
        {tab === 'about' &&
          <section className={style.about}>
            <Sinopse>
              <p>{data.description}</p>
            </Sinopse>
            <Tags tags={data.tags} />
            <GridBooksRecomendations />
          </section>}


        {tab === 'chapters' &&
          <section className={style.chapthers}>
            <TableChapterContent />
          </section>
        }
      </main>
    </Layout >
  )
}