import { useState } from 'react';
import style from './style.module.css';
import { INovel } from '@/types/novel';
import { Thumbnail } from '@/Components/Thumbnail';
import { IconFlag, IconInfo } from '@/assets/icons';
import { NovelPageButtonsActions } from '@/Components/NovelPageButtonsActions';
import { ModalBottom } from '@/Components/ModalBottom';
import { FullBookDetails } from '@/Components/FullBookDetails';
import { TabContent, TabList, TabTrigger, Tabs } from '@/Components/Tabs';
import { Sinopse } from '@/Components/Sinopse';
import { Tags } from '@/Components/Tags';
import { GridBooksRecomendations } from '@/Components/GridBooksRecomendations';
import { TableChapterContent } from '@/Components/TableChapterContent';
import { useAuth } from '@/Hook/useAuth';

interface IProps {
  novel: INovel
}

export const NovelTemplate = ({ novel }: IProps) => {

  const [showBottomModal, setShowBottomModal] = useState(false);

  function toggleModalVisibility() {
    setShowBottomModal(!showBottomModal)
  }

  const { user } = useAuth()

  return (
    <div className={style.novel}>
      <header className={style.header}>
        <div className={style.bookCover}>
          <div className={style.thumbnail}>
            <Thumbnail src={novel.thumbnail} alt={novel.title} />
          </div>
          <div className={style.bookDetails}>
            <div className={style.row}>
              <span className={style.mainFeatures}>{novel.main_genre}</span>
              <h3 className={style.title}>{novel.title}</h3>
              <p className={style.author}>{novel.author}</p>
            </div>
            <div className={style.row}>
              <div>
                <span className={style.status}>{novel.status}</span>
                <span className={style.divider}></span>
                <span className={style.year}>{novel.year}</span>
              </div>
              <button onClick={toggleModalVisibility}><IconInfo /></button>
            </div>
          </div>
        </div>

        {novel.id && user && user.id && <NovelPageButtonsActions userId={user.id} novel={novel} />}

        {novel && showBottomModal &&
          <ModalBottom className={style.modal} isShow={showBottomModal} hiddenModal={setShowBottomModal}>
            <FullBookDetails data={novel} />
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
            {novel.sinopse && novel.sinopse.map(text => <p key={text.split(" ")[0]}>{text}</p>)}
          </Sinopse>
          <Tags tags={novel.tags} />
          <GridBooksRecomendations />
        </TabContent>
        <TabContent value='chapters'>
          <TableChapterContent novelslug={novel.slug} chapters={novel.chapters} />
        </TabContent>
      </Tabs>
    </div>
  )
}