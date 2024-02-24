import { FC, HTMLAttributes, useEffect } from 'react';
import style from './style.module.css';
import { IconArrowCompactDown } from '../../assets/icons';

interface IProps extends HTMLAttributes<HTMLElement> {
  children?: React.ReactNode,
  hiddenModal?: (value: boolean) => void,
  isShow: boolean,
}

export const ModalBottom: FC<IProps> = ({ children, hiddenModal, isShow, ...rest }) => {

  useEffect(() => {
    if (isShow) {
      (document.querySelector("body") as HTMLElement).style.overflow = 'hidden';
    } else {
      (document.querySelector("body") as HTMLElement).style.overflow = 'unset';
    }
  }, [isShow])

  function handle(e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.currentTarget === e.target || (e.target as HTMLElement).classList.contains('arrow-icon')) {
      (document.querySelector("body") as HTMLElement).style.overflow = 'unset';
      hiddenModal && hiddenModal(false)
    }
  }

  return (
    <div className={style.modal} onClick={handle}>
      <div className={style.wrapper}>
        <button className={style.toggleVisibility} onClick={handle}>
          <IconArrowCompactDown className="arrow-icon" />
        </button>
        <div  {...rest} className={[style.content, rest.className].join(" ")}>
          {children}
        </div>
      </div>
    </div>
  )
}