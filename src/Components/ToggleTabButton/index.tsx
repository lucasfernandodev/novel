import style from './style.module.css';

type tab = 'about' | 'chapters';
interface IProps {
  changeTab: (tab: tab) => void
}

export const ToggleTabButton: React.FC<IProps> = ({ changeTab }) => {

  function toggleTab(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation()
    const button = e.currentTarget as HTMLButtonElement;
    const nodes = button.childNodes as NodeListOf<HTMLSpanElement>
    const target = e.target as HTMLButtonElement | HTMLSpanElement;

    if (typeof target.dataset.target !== "undefined") {
      nodes.forEach(el => el.classList.remove(style.hightlite))
      target.classList.add(style.hightlite)
      changeTab(target.dataset.target as tab)
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