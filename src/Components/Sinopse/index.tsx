import { useEffect, useRef, useState } from 'react';
import style from './style.module.css';

interface IProps {
  children?: React.ReactNode;
}

export const Sinopse: React.FC<IProps> = ({ children }) => {

  const sinopseRef = useRef<HTMLDivElement>(null)
  const [showFullSinopse, setShowFullSinopse] = useState(false)
  const [sinopseToggleButtonVisibility, setSinopseToggleButtonVisibility] = useState(true)

  function toggleSinopseCollpase() {
    setShowFullSinopse(!showFullSinopse)
  }

  useEffect(() => {
    if (sinopseRef.current) {
      if (sinopseRef.current.childNodes.length === 1) {
        setSinopseToggleButtonVisibility(false)
      } else {
        setSinopseToggleButtonVisibility(true)
      }
    }
  }, [sinopseRef])

  return (
    <div>
      <h3 className={style.title}>Sinopse</h3>
      <div className={style.sinopse}>
        <div ref={sinopseRef} className={style.content} data-full={showFullSinopse}>
          {children}
        </div>
        {sinopseToggleButtonVisibility &&
          <button onClick={toggleSinopseCollpase}>
            {!showFullSinopse ? 'Mostrar mais' : 'Mostrar menos'}
          </button>}
      </div>
    </div>
  )
}