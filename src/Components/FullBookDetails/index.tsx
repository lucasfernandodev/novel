import { FC } from 'react';
import style from './style.module.css';
import { INovel } from '../../types/novel';
import { Link } from 'react-router-dom';


interface IProps {
  data: Partial<INovel>
}

export const FullBookDetails: FC<IProps> = ({ data }) => {
  return (
    <div className={style.container}>
      <h3>Mais sobre este livro</h3>
      <ul>
        <li>
          <span>Classificação:</span><span>{data.rating}</span>
        </li>
        <li>
          <span>Status:</span><span>{data.status}</span>
        </li>
        <li>
          <span>Autor:</span><Link to="#autor">{data.author}</Link>
        </li>
        <li>
          <span>Editora:</span><span>{data.publisher}</span>
        </li>
        <li>
          <span>Capitulos:</span><span>{data.qtd_chapters}</span>
        </li>
        <li>
          <span>Ano de publicação:</span><span>{data.year}</span>
        </li>
        <li>
          <span>Linguagem:</span><span>{data.language}</span>
        </li>
      </ul>

    </div>
  )
}