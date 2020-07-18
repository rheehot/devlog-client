import * as React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import DefaultTags from '../tag/DefaultTags';
import { PostType } from '../../graphql/post';
import { formatDate } from '../../lib/utils';
import { useRouter } from 'next/dist/client/router';

type PostCardProps = {
  post: PostType;
};

const { useCallback } = React;
function PostCard({ post }: PostCardProps) {
  const router = useRouter();
  const redirectPostDetail = useCallback(() => {
    router.push(
      `/post/[title]/?id=${post.id}`,
      `/post/${post.post_header}?id=${post.id}`,
    );
  }, []);
  return (
    <Block onClick={redirectPostDetail}>
      <div className="post-header">
        <h2>{post.post_header}</h2>
      </div>
      <div className="short-description">
        <span>{post.short_description}</span>
      </div>
      <div className="tag">
        <DefaultTags tags={post.tags} />
      </div>
      <div className="post-date">
        <span>작성: {formatDate(post.created_at)}</span>
        <span>수정: {formatDate(post.updated_at)}</span>
      </div>
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  height: 18rem;
  margin-bottom: 1rem;
  padding: 2rem;
  border-radius: 0.25rem;
  box-shadow: 1px 1px 10px 2px ${palette.gray1};
  overflow: auto;

  .post-header {
    display: flex;
    flex-flow: row wrap;
    font-size: 1.5rem;
    font-weight: bold;
    color: ${palette.pink7};
    margin-bottom: 1.5rem;
  }

  .short-description {
    display: flex;
    flex-flow: row wrap;
    line-height: 1.5rem;
    margin-bottom: 2rem;
  }

  .tag {
    margin-bottom: 1.5rem;
  }

  .post-date {
    display: flex;
    flex-direction: column;
    span {
      margin-bottom: 0.5rem;
    }
  }

  &:hover {
    cursor: pointer;
    box-shadow: 1px 1px 10px 2px ${palette.gray3};
  }
`;

export default PostCard;
