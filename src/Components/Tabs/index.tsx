import { FC, HTMLAttributes, ReactNode, useContext, useEffect, useRef } from 'react';
import style from './style.module.css';
import { TabContext } from '@/context/Tabs/TabContext';
import { TabProvider } from '@/context/Tabs/TabProvider';

interface ITabs extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

const TabsRoot: FC<ITabs> = ({ children, ...rest }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { tab } = useContext(TabContext)

  useEffect(() => {
    if (ref.current) {
      const root = ref.current as HTMLDivElement;
      const tabsTrigger = root.querySelectorAll('span[data-type="trigger"]') as NodeListOf<HTMLSpanElement>
      const containers = root.querySelectorAll('div[data-type="content"]') as NodeListOf<HTMLDivElement>;
      const firstTriggerElement = tabsTrigger[0]
      const firstContainerElement = containers[0]

      firstTriggerElement && firstTriggerElement.classList.add(style.active)
      firstContainerElement && firstContainerElement.classList.add(style.active)
    }
  }, [ref])

  useEffect(() => {
    if (ref.current && tab !== null) {
      const root = ref.current as HTMLDivElement;
      const containers = root.querySelectorAll('div[data-type="content"]') as NodeListOf<HTMLDivElement>;
      containers.forEach(item => {
        if (item.dataset.value === tab) {
          item.classList.add(style.active)
          item.setAttribute('aria-selected', 'true')
        } else {
          item.classList.remove(style.active)
          item.setAttribute('aria-selected', 'false')
        }
      })
    }
  }, [tab, ref])

  return (
    <div {...rest} ref={ref} className={[style.tab, rest.className].join(" ")}>
      {children}
    </div>
  )
}



interface ITabList extends HTMLAttributes<HTMLDivElement>{
  
}
export const TabList: FC<ITabList> = ({ children , ...rest}) => {

  const { changeTab } = useContext(TabContext)

  function toggleTab(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    e.stopPropagation()
    const tabList = e.currentTarget as HTMLDivElement;
    const nodes = tabList.childNodes as NodeListOf<HTMLSpanElement>
    const target = e.target as HTMLDivElement | HTMLSpanElement;

    if (typeof target.dataset.type !== "undefined") {
      nodes.forEach(el => el.classList.remove(style.active))
      target.classList.add(style.active);
      changeTab(target.dataset.option as string)
    }
  }

  return (
    <div {...rest} role="tablist" className={[style.tabList, rest.className].join(" ")} onClick={toggleTab}>
      {children}
    </div>
  )
}

interface ITabTrigger extends HTMLAttributes<HTMLSpanElement> {
  option: string
}

export const TabTrigger: FC<ITabTrigger> = ({ option, children, ...rest }) => {
  return (
    <span
      {...rest}
      id={`tab-control-${option}`}
      role='tab'
      aria-controls={`tab-content-${option}`}
      className={[style.tabTrigger, rest.className].join(" ")}
      data-option={option}
      data-type="trigger">
      {children}
    </span>
  )
}


interface ITabContainer extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode,
  value: string
}

export const TabContent: FC<ITabContainer> = ({ children, value, ...rest }) => {
  return (
    <div
      {...rest}
      id={`tab-content-${value}`}
      role="tabpanel"
      aria-labelledby={`tab-control-${value}`}
      className={[style.content, rest.className].join(" ")}
      data-value={value}
      data-type="content"
    >
      {children}
    </div>
  )
}



export const Tabs: FC<ITabs> = ({ ...rest }) => {
  return (
    <TabProvider>
      <TabsRoot {...rest}>{rest.children}</TabsRoot>
    </TabProvider>
  )
}