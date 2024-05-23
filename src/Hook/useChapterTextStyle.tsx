import { useState } from "react";
import { usePersistState } from "./usePersistState"
import { ITextStyleConfig } from "@/types/text-style-config";

export const useChapterTextStyle = () => {
  const defaultStyle: ITextStyleConfig = {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 16,
    lineHeight: 26,
    gap: 16
  }

  const [config, setConfig] = usePersistState<ITextStyleConfig>('chapter-style-text', defaultStyle);
  const [preview, setPreviewConfig] = useState(config)

  return {
    config,
    preview,
    changePreviewConfig: setPreviewConfig,
    changeConfig: setConfig
  }
}