import { Layout } from "@/layout/Layout"
import { redirect, useParams } from "react-router-dom";
import { ChapterTemplate } from "@/Components/Templates/Chapter";
import { IChapter } from "@/types/chapter";
import { chapterApi } from "@/api/chapter-api";
import { useQuery } from "react-query";
import { Loading } from "@/Components/Loading";

export const Chapter = () => {

  const { chapterId } = useParams();

  if(!chapterId) return redirect("/");

  const { data, isLoading } = useQuery<{ chapter: IChapter }>(
    ['chapter', chapterId], async () => await chapterApi.get({ chapterId: chapterId as string })
  )

  return (
    <Layout>
      {isLoading && <Loading />}
      {!isLoading && !data && <h1>Capítulo não encontrado!</h1>}
      {!isLoading && data && <ChapterTemplate chapter={data.chapter} />}
    </Layout>
  )
}