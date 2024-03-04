import style from './style.module.css';
import { Layout } from '../../layout/Layout';
import { Thumbnail } from '@components/Thumbnail';
import { IconFlag, IconInfo } from '../../assets/icons';
import { Sinopse } from '@components/Sinopse';
import { GridBooksRecomendations } from '@components/GridBooksRecomendations';
import { useEffect, useState } from 'react';
import { generateSlug } from '../../utils/generateSlug';
import { NovelPageButtonsActions } from '@components/NovelPageButtonsActions';
import { ModalBottom } from '@components/ModalBottom';
import { INovel } from '../../types/novel';
import { FullBookDetails } from '@components/FullBookDetails';
import { Tags } from '@components/Tags';
import { TableChapterContent } from '@components/TableChapterContent';
import { TabContent, TabList, TabTrigger, Tabs } from '@/Components/Tabs';
import { useNavigate, useParams } from 'react-router-dom';



export const Novel = () => {

  const navigate = useNavigate()
  const {novelId: novelId} = useParams();
  const [data, setData] = useState({} as INovel);
  const [showBottomModal, setShowBottomModal] = useState(false);

  if(!novelId){
    navigate("/")
  }

  useEffect(() => {
    async function getNovel() {
      const req = await fetch('http://192.168.1.5:3000/novels');
      const list = await req.json() as INovel[]

      if (list.length > 0) {
        for (const novel of list) {
          const currentSlug = generateSlug(novel.title);
          if (currentSlug === novelId) {
            setData(novel); break;
          }
        }
      }
    }

    getNovel().catch(console.error)
  }, [novelId])


  function toggleModalVisibility() {
    setShowBottomModal(!showBottomModal)
  }

  return (
    <Layout className={style.novel}>
      <header className={style.header}>
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

        {data && showBottomModal &&
          <ModalBottom className={style.modal} isShow={showBottomModal} hiddenModal={setShowBottomModal}>
            <FullBookDetails data={data} />
            <button className={style.report}>
              <span><IconFlag /></span>
              <span>Reportar</span>
            </button>
          </ModalBottom>
        }
      </header>

      <Tabs className={style.tabs}>
        <TabList className={style.tablist}>
          <TabTrigger option='about'>Sobre</TabTrigger>
          <TabTrigger option='chapters'>Lista de Capítulos</TabTrigger>
        </TabList>
        <TabContent value='about' className={style.about}>
          <Sinopse>
            <p>{data.description}</p>
          </Sinopse>
          <Tags tags={data.tags} />
          <GridBooksRecomendations />
        </TabContent>
        <TabContent value='chapters'>
          <TableChapterContent novelId={novelId as string}
          />
        </TabContent>
      </Tabs>
    </Layout >
  )
}