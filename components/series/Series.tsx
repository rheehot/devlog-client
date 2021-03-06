import * as React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { GET_SERIES, SeriesType } from '../../graphql/series';
import SeriesItem from './SeriesItem';
import SeriesSkelleton from './SeriesSkelleton';
import HeadWrapper from '../common/HeadWrapper';
import ErrorPageWrapper from '../common/ErrorPageWrapper';
import { getErrorCode } from '../../lib/utils';

type SeriesProps = {};

const { memo } = React;
function Series(props: SeriesProps) {
  const { loading, error, data } = useQuery<{ series: Array<SeriesType> }>(
    GET_SERIES,
  );
  if (loading) return <SeriesSkelleton />;
  if (error) {
    const code = getErrorCode(error);
    return <ErrorPageWrapper code={code} />;
  }

  return (
    <Block>
      <HeadWrapper
        title="시리즈 - DevLog"
        description="시리즈 글 목록"
        url="series"
      />
      <Head>
        <title>시리즈 - DevLog</title>
        <meta name="description" content="시리즈 글 목록" />
        <meta property="og:title" content="DevLog" />
        <meta property="og:description" content="시리즈 글 목록" />
        <meta property="og:url" content="https://devlog.juntae.kim/series" />
        <meta property="og:type" content="article" />
      </Head>
      {data?.series.map((v, i) => (
        <SeriesItem key={v.series_name} series={v} />
      ))}
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
`;

export default memo(Series);
