import { useState } from 'react';
import { Navigation } from '../../Components/Navigation';
import style from './style.module.css';
import { Link } from '../Link';
import { Avatar } from '../../Components/Avatar';

export const Header = () => {
  const [isOpen,setIsOpen] = useState(false);

  function toggleNavigationMenu(){
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
      <Avatar src="" alt="User" onClick={toggleNavigationMenu}/>
      {isOpen && <Navigation closeMenu={setIsOpen}/>}
    </header>
  )
}