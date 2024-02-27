import React from 'react';
import style from './style.module.css';
import { IconBooks, IconCompass, IconConfig, IconServer, IconUpdate } from '../../assets/icons';
import { Link } from '../../layout/Link';
import { Avatar } from '../Avatar';
import { useAuth } from '../../Hook/useAuth';

interface IPropsNavigation {
  closeMenu: (value: boolean) => void
}

export const Navigation: React.FC<IPropsNavigation> = ({ closeMenu }) => {

  const { user, signout } = useAuth();

  function toggleVisibility(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    e.preventDefault()
    const nav = e.target as HTMLElement
    if (nav && typeof nav.dataset.root !== 'undefined') return closeMenu(false)
  }

  return (
    <nav className={style.navigation} onClick={toggleVisibility} data-root="true">
      <div className={style.wrapper}>
        {user ? <div className={style.userProfile}>
          <div className={style.col}>
            <Avatar src={user.avatarUrl ?? ''} alt={user.name} width={48} height={48} />
          </div>
          <div className={style.col}>
            <div className={style.info}>
              <span className={style.name}>{user.name}</span>
              <span className={style.url}>{user.username}</span>
            </div>
          </div>
        </div> : <div className={style.containerButton}><Link to="/signin">Acessar Conta</Link></div>}
        <ul className={style.menu}>
          <li className={style.item}>
            <Link to="#" className={style.link}>
              <span><IconBooks /></span>
              <span>Biblioteca</span>
            </Link>
          </li>
          <li className={style.item}>
            <Link to="#" className={style.link}>
              <span><IconUpdate /></span>
              <span>Atualizações</span>
            </Link>
          </li>
          <li className={style.item}>
            <Link to="#" className={style.link}>
              <span><IconCompass /></span>
              <span>Explorar</span>
            </Link>
          </li>
          <li className={style.item}>
            <Link to="#" className={style.link}>
              <span><IconServer /></span>
              <span>status</span>
            </Link>
          </li>
          <li className={style.item}>
            <Link to="#" className={style.link}>
              <span><IconConfig /></span>
              <span>Configurações</span>
            </Link>
          </li>
          <li className={style.item}>
            {user && <Link to="#" className={style.link} onClick={signout}>
              <span>Sair</span>
            </Link>}
          </li>
        </ul>
      </div>
    </nav>
  )
}