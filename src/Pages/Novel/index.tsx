import { Layout } from '../../layout/Layout';
import { useEffect, useState } from 'react';
import { INovel } from '../../types/novel';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { Loading } from '@/Components/Loading';
import { NovelTemplate } from '@/Components/Templates/Novel';
import { novelApi } from '@/api/novel-api';


export const Novel = () => {

  const navigate = useNavigate()
  const { slug } = useParams();
  const [novel, setNovel] = useState({} as INovel);


  if (!slug) {
    navigate("/")
  }

  const { data, isLoading } = useQuery('getNovel',
    async () => await novelApi.get({ slug: slug as string })
  );

  useEffect(() => {
    if (!isLoading && data) return setNovel(data)
    if (!isLoading && !data) return navigate("/")
  }, [isLoading, data, navigate])


  return (
    <Layout>
      {!isLoading && novel ? <NovelTemplate novel={novel} /> : <Loading />}
    </Layout >
  )
}