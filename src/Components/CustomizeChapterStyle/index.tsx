import { FC, HTMLAttributes } from 'react';
import style from './style.module.css';
import { Select } from '../Select';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  changeFontFamily: (font: string) => void,
  changeFontSize: (size: number) => void,
  changeLineHeight: (size: number) => void,
  changeGap: (gap: number) => void,
  closeMenu: (value: boolean) => void
}


export const CustomizeChapterStyle: FC<IProps> = ({
  changeFontFamily,
  changeFontSize,
  changeLineHeight,
  changeGap,
  closeMenu
}) => {
  const optionsFontSize = [
    { value: 16, label: "16" },
    { value: 18, label: "18" },
    { value: 24, label: "24" }
  ]

  const optionsLineHeight = [
    { value: 26, label: "Default" }
  ]

  const optionsFamily = [
    { value: 'Roboto, sans-serif', label: 'Roboto' },
    { value: 'Open sans, sans-serif', label: 'Open sans' },
    { value: 'Nunito sans, sans-serif', label: 'Nunito sans' },
    { value: 'Merriweather, sans-serif', label: 'Merriweather' },
  ]

  const optionsGap = [
    { value: 16, label: "16" },
    { value: 24, label: "24" },
    { value: 32, label: "32" }
  ]

  function toggleVisibility(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    e.preventDefault()
    const modal = e.target as HTMLElement
    if (modal && typeof modal.dataset.root !== 'undefined') return closeMenu(false)
  }

  function saveConfig(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    closeMenu(false)
  }

  return (
    <div className={style.modal} onClick={toggleVisibility} data-root="true">
      <div className={style.wrapper}>
        <h2 className={style.title}>Configurações de leitura</h2>
        <form className={style.form}>
          <fieldset>
            <label htmlFor="font-size">Escolha uma familia de fonte</label>
            <Select
              defaultValue={optionsFamily[0]}
              options={optionsFamily}
              onChange={e => changeFontFamily(e?.value ?? optionsFamily[0].value)}
              isMulti={false}
            />
          </fieldset>
          <fieldset>
            <label>Tamanho da fonte</label>
            <Select
              defaultValue={optionsFontSize[0]}
              options={optionsFontSize}
              onChange={e => changeFontSize(e?.value ?? optionsFontSize[0].value)}
            />
          </fieldset>
          <fieldset>
            <label>Espaçamento entre linhas</label>
            <Select
              defaultValue={optionsLineHeight[0]}
              options={optionsLineHeight}
              onChange={e => changeLineHeight(e?.value ?? optionsLineHeight[0].value)}
            />
          </fieldset>
          <fieldset>
            <label>Espaçamento entre paragrafos</label>
            <Select
              defaultValue={optionsGap[0]}
              options={optionsGap}
              onChange={e => changeGap(e?.value ?? optionsGap[0].value)}
            />
          </fieldset>
          <button className={style.button} onClick={saveConfig}>Salvar</button>
        </form>
      </div>
    </div >
  )
}