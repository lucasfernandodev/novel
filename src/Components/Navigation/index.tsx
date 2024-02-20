import { Link } from 'react-router-dom';
import style from './style.module.css';

export const Navigation = () => {
  return (
    <nav className={style.navigation}>
      <div className={style.wrapper}>

        <div className={style.userProfile}>
          <div className={style.col}>
            <div className={style.avatar}></div>
          </div>
          <div className={style.col}>
            <div className={style.info}>
              <span>Lucas Fernando</span>
              <span>@lucasfernandodev</span>
            </div>
          </div>
        </div>
        <ul className={style.menu}>
          <li className={style.item}>
            <Link to="#" className={style.link}><span>Biblioteca</span></Link>
          </li>
          <li className={style.item}>
            <Link to="#" className={style.link}><span>Atualizações</span></Link>
          </li>
          <li className={style.item}>
            <Link to="#" className={style.link}><span>Explorar</span></Link>
          </li>
          <li className={style.item}>
            <Link to="#" className={style.link}><span>status</span></Link>
          </li>
          <li className={style.item}>
            <Link to="#" className={style.link}><span>Configurações</span></Link>
          </li>
          <li className={style.item}>
            <Link to="#" className={style.link}><span>Sair</span></Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}