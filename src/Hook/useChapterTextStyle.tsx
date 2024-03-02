import { useState } from "react";
import { usePersistState } from "./usePersistState"

export interface IChapterTextStyle{
  fontFamily: string,
  fontSize: number,
  lineHeight: number,
  gap: number
}

export const useChapterTextStyle = () => {
  const defaultStyle: IChapterTextStyle = {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 16,
    lineHeight: 28,
    gap: 16
  }

  const [config, setConfig] = usePersistState<IChapterTextStyle>('chapter-style-text', defaultStyle);
  const [preview, setPreviewConfig] = useState(config)

  return {
    config,
    preview,
    changePreviewConfig: setPreviewConfig,
    changeConfig: setConfig
  }
}