import { Layout } from "@/layout/Layout"
import { useNavigate, useParams } from "react-router-dom";
import { ChapterTemplate } from "@/Components/Templates/Chapter";

export const Chapter = () => {
  const navigate = useNavigate()
  const { novelId, chapterId } = useParams();

  if (!novelId || !chapterId) {
    navigate(`/novel/${novelId}`)
  }

  return (
    <Layout>
      {chapterId && <ChapterTemplate chapterId={chapterId} />}
    </Layout>
  )
}