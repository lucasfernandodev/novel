import { Link } from "@/layout/Link"
import { INovelChapter } from "@/types/novel"
import { FC } from "react"
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime)

interface IProps {
  novelSlug: string,
  chapters: INovelChapter[] | null
}

export const TableChapterList: FC<IProps> = ({ chapters, novelSlug }) => {

  if (!chapters || chapters.length === 0) return <p>Nenhum capitulo foi adicionado ainda!</p>

  return (
    <ul>
      {chapters.map(chapter => {
        const chapterUrl = `/novel/${novelSlug}/chapter/${chapter.id}`
        return (
          <li key={chapter.id}>
            <Link to={chapterUrl}>{chapter.title}</Link>
            <span>{dayjs().to(chapter.createdAt, true)} ago</span>
          </li>
        )
      })}
    </ul>
  )
}