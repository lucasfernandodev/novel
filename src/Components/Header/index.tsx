import style from './style.module.css';

export const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.brand}>
        <img src="/logo.svg" alt="logo" />
      </div>
      <form className={style.form__search}>
        <input type="text" className={style.search} placeholder='Buscar por título, autor, editora, gênero...' />
      </form>
      <div className={style.avatar}></div>
    </header>
  )
}