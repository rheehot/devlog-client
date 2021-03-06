import * as React from 'react';
import styled from 'styled-components';
import PostCard from './PostCard';
import { useRouter } from 'next/dist/client/router';
import { GET_POSTS, PostType } from '../../graphql/post';
import { useQuery } from '@apollo/react-hooks';
import PostCardsSkelleton from './PostCardsSkelleton';
import ErrorPageWrapper from '../common/ErrorPageWrapper';
import { getErrorCode } from '../../lib/utils';
import HeadWrapper from '../common/HeadWrapper';

type PostCardsProps = {};

const { memo } = React;
function PostCards(props: PostCardsProps) {
  const { query } = useRouter();
  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: {
      tag: query.tag,
    },
  });

  if (loading) return <PostCardsSkelleton />;
  if (error) {
    const code = getErrorCode(error);
    return <ErrorPageWrapper code={code} />;
  }

  return (
    <Block>
      <HeadWrapper
        title={query.tag ? `DevLog - ${query.tag}` : 'DevLog'}
        description={query.tag ? `${query.tag}에 관한 글목록` : ''}
        url={`${query.tag ? `posts/${query.tag}` : ''}`}
      />
      {data.posts.map((val: PostType, idx: number) => (
        <PostCard key={`${val.id}${idx}`} post={val} />
      ))}
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
`;

export default memo(PostCards);
