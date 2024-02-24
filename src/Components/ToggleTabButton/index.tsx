import style from './style.module.css';

interface IProps {
  changeTab: (tab: 'about' | 'chapters') => void
}

export const ToggleTabButton: React.FC<IProps> = ({ changeTab }) => {

  function toggleTab(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation()
    const button = e.currentTarget as HTMLButtonElement;
    const options = button.querySelectorAll('span');

    for (const option of options) {
      const tab = option.dataset.target as 'about' | 'chapters';
      if (option.classList.contains(style.hightlite)) {
        option.classList.remove(style.hightlite)
      } else {
        if (tab) {
          option.classList.add(style.hightlite)
          changeTab && changeTab(tab)
        }
      }
    }
  }

  return (
    <nav className={style.wrapper}>
      <button className={style.button} onClick={toggleTab}>
        <span data-target="about" className={style.hightlite}>Sobre</span>
        <span data-target="chapters">Lista de capítulos</span>
      </button>
    </nav>
  )
}