import { useState } from 'react';
import { Navigation } from '../../Components/Navigation';
import style from './style.module.css';
import { Link } from '../Link';
import { Avatar } from '../../Components/Avatar';
import { useAuth } from '../../Hook/useAuth';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth()

  function toggleNavigationMenu() {
    setIsOpen(!isOpen)
  }

  return (
    <header className={style.header}>
      <Link to="/" className={style.brand}>
        <img src="/logo.svg" alt="logo" />
      </Link>
      <form className={style.form__search}>
        <input type="text" className={style.search} placeholder='Buscar por título, autor, editora, gênero...' />
      </form>
      <Avatar src={user?.avatarUrl ?? ''} alt={user?.name ?? 'Image not loaded'} onClick={toggleNavigationMenu} />
      {isOpen && <Navigation closeMenu={setIsOpen} />}
    </header>
  )
}