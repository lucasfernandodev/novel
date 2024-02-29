import { Layout } from "@/layout/Layout"
import style from './style.module.css';
import { useQuery } from "react-query";
import { useApi } from "@/Hook/useApi";
import { useSearchParams } from "react-router-dom";
import { IChapter } from "@/types/chapter";

export const Chapter = () => {

  const api = useApi()
  const [search,] = useSearchParams();
  const { data, isLoading } = useQuery<IChapter>('chapter', () => api.getChapterPage(search.get("id") as string))
  
  return (
    <Layout className={style.layout}>
      <h1>Capítulo 1 - O Despertar da Aventura</h1>
      <div className={style.content}>
        {!isLoading && data && (data as IChapter).content.map(pr => <p>{pr}</p>)}
      </div>
    </Layout>
  )
}