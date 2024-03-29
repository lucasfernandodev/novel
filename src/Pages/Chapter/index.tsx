import { Layout } from "@/layout/Layout"
import { useParams } from "react-router-dom";
import { ChapterTemplate } from "@/Components/Templates/Chapter";

export const Chapter = () => {

  const { chapterId } = useParams();

  return (
    <Layout>
      {chapterId && <ChapterTemplate chapterId={chapterId} />}
    </Layout>
  )
}