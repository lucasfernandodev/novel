import { reactSelectStyle } from '@/styles/react-select-style'
import ReactSelect, { GroupBase, Props } from 'react-select'


export const Select = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group>) => {
    return <ReactSelect<Option, IsMulti, Group> styles={reactSelectStyle()} isSearchable={false} {...props} />
}