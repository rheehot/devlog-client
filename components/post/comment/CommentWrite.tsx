import * as React from 'react';
import styled from 'styled-components';
import DefaultInput from '../../common/Input';
import useInputs from '../../../lib/hooks/useInputs';
import Textarea from '../../common/Textarea';
import { useRouter } from 'next/dist/client/router';
import Button from '../../common/Button';
import commentWrite from './hooks/commentWrite';

type CommentWriteProps = {};

const { useCallback } = React;
function CommentWrite(props: CommentWriteProps) {
  const router = useRouter();
  const post_id = router.query.id as string;
  const [state, onChange, onReset] = useInputs({
    writer: '',
    password: '',
    comment: '',
  });
  const { createComment } = commentWrite();
  const handleCreateComment = useCallback(async () => {
    await createComment({
      post_id: Number(post_id),
      writer: state.writer,
      password: state.password,
      comment: state.comment,
    });
    onReset();
  }, [state]);

  return (
    <Block>
      <div className="user-info">
        <DefaultInput
          type="text"
          name="writer"
          placeholder="작성자"
          value={state.writer}
          handleChange={onChange}
        />
        <DefaultInput
          type="password"
          name="password"
          placeholder="비밀번호"
          value={state.password}
          handleChange={onChange}
        />
      </div>
      <div className="comment">
        <Textarea
          name="comment"
          value={state.comment}
          placeholder="댓글을 작성하세요"
          handleChange={onChange}
        />
      </div>
      <div className="comment-button-area">
        <Button handleClick={handleCreateComment} color="teal">
          댓글 작성
        </Button>
      </div>
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  .user-info {
    display: flex;
    flex-flow: row wrap;
    margin-bottom: 0.125rem;
  }
  .comment {
    margin-bottom: 2vh;
  }
  .comment-button-area {
    display: flex;
    justify-content: flex-end;
  }
`;

export default CommentWrite;
