import { GridBooksRating } from '../../Components/GridBooksRating';
import { GridNewBooks } from '../../Components/GridNewBooks';
import { Layout } from '../../layout/Layout';

import style from './style.module.css';

export const Homepage = () => {

  return (
    <Layout className={style.layout}>
      <GridNewBooks />
      <GridBooksRating />
    </Layout>
  )
}