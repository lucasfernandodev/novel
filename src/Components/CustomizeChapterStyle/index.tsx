import { FC, HTMLAttributes, useEffect, useState } from 'react';
import style from './style.module.css';
import { Select } from '../Select';
import { ITextStyleConfig } from '@/types/text-style-config';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  config: ITextStyleConfig,
  closeMenu: (value: boolean) => void,
  changeConfig: (value: ITextStyleConfig) => void
  changeConfigPreview: (value: ITextStyleConfig) => void
}


export const CustomizeChapterStyle: FC<IProps> = ({
  changeConfig,
  changeConfigPreview,
  closeMenu,
  config
}) => {

  const [currentConfig, setCurrentconfig] = useState<ITextStyleConfig>(config);

  useEffect(() => {
    if (currentConfig !== config) {
      changeConfigPreview(currentConfig);
    }
  }, [config, changeConfigPreview, currentConfig])

  const set = {
    fontFamily: (fonts: string) => {
      setCurrentconfig(prev => ({ ...prev, fontFamily: fonts }))
    },
    fontSize: (size: number) => {
      setCurrentconfig(prev => ({ ...prev, fontSize: size }))
    },
    lineHeight: (lineHeight: number) => {
      setCurrentconfig(prev => ({ ...prev, lineHeight: lineHeight }))
    },
    gap: (gap: number) => {
      setCurrentconfig(prev => ({ ...prev, gap: gap }))
    }
  }


  const optionsFontSize = [
    { value: 16, label: "16" },
    { value: 18, label: "18" },
    { value: 24, label: "24" },
    { value: 24, label: "26" },
    { value: 24, label: "32" }
  ]

  const optionsLineHeight = [
    { value: 16, label: "16" },
    { value: 18, label: "18" },
    { value: 24, label: "24" },
    { value: 26, label: "26" },
    { value: 32, label: "32" }
  ]

  const optionsFamily = [
    { value: 'Roboto, sans-serif', label: 'Roboto' },
    { value: 'Open sans, sans-serif', label: 'Open sans' },
    { value: 'Nunito sans, sans-serif', label: 'Nunito sans' },
    { value: 'Merriweather, sans-serif', label: 'Merriweather' },
  ]

  const optionsGap = [
    { value: 16, label: "16" },
    { value: 18, label: "18" },
    { value: 24, label: "24" },
    { value: 26, label: "26" },
    { value: 32, label: "32" }
  ]

  function toggleVisibility(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    e.preventDefault()
    const modal = e.target as HTMLElement
    if (modal && typeof modal.dataset.root !== 'undefined') return closeMenu(false)
  }

  function saveConfig(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    changeConfig(currentConfig)
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
              defaultValue={optionsFamily.filter(opt => opt.value === config.fontFamily)}
              options={optionsFamily}
              onChange={e => e?.value && set.fontFamily(e?.value)}
              isMulti={false}
            />
          </fieldset>
          <fieldset>
            <label>Tamanho da fonte</label>
            <Select
              defaultValue={optionsFontSize.filter(opt => opt.value === config.fontSize)}
              options={optionsFontSize}
              onChange={e => e?.value && set.fontSize(e?.value)}
            />
          </fieldset>
          <fieldset>
            <label>Espaçamento entre linhas</label>
            <Select
              defaultValue={optionsLineHeight.filter(opt => opt.value === config.lineHeight)}
              options={optionsLineHeight}
              onChange={e => e?.value && set.lineHeight(e?.value)}
            />
          </fieldset>
          <fieldset>
            <label>Espaçamento entre paragrafos</label>
            <Select
              defaultValue={optionsGap.filter(opt => opt.value === config.gap)}
              options={optionsGap}
              onChange={e => e?.value && set.gap(e?.value)}
            />
          </fieldset>
          <button className={style.button} onClick={saveConfig}>Salvar</button>
        </form>
      </div>
    </div >
  )
}