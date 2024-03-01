import { StylesConfig } from 'react-select'

export const reactSelectStyle: StylesConfig = {
  singleValue: (base) => ({
    ...base,
    color: 'var(--white)'
  }),
  control: (baseStyles) => ({
    ...baseStyles,
    background: 'var(--black-700)',
    borderColor: 'var(--black-400)',
    height: '42px',
  }),
  indicatorSeparator: (base) => ({
    ...base,
    background: 'var(--black-700)'
  }),
  menuList: (base) => ({
    ...base,
    background: 'var(--black-700)'
  }),
  option: (base, state) => ({
    ...base,
    background: state.isSelected ? 'var(--primary)' : 'var(--black-700)',
    color: 'var(--white)'
  }),
}