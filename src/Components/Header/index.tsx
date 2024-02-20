import { useState } from 'react';
import { Navigation } from '../Navigation';
import style from './style.module.css';

export const Header = () => {
  const [isOpen,setIsOpen] = useState(false);

  function toggleNavigationMenu(){
    setIsOpen(!isOpen)
  }

  return (
    <header className={style.header}>
      <div className={style.brand}>
        <img src="/logo.svg" alt="logo" />
      </div>
      <form className={style.form__search}>
        <input type="text" className={style.search} placeholder='Buscar por título, autor, editora, gênero...' />
      </form>
      <div className={style.avatar} onClick={toggleNavigationMenu}></div>
      {isOpen && <Navigation closeMenu={setIsOpen}/>}
    </header>
  )
}