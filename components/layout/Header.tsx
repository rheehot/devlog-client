import * as React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import media from '../../lib/styles/media';
import { useRouter } from 'next/dist/client/router';

type HeaderProps = {};

const { useCallback } = React;
function Header(props: HeaderProps) {
  const router = useRouter();
  const redirectHome = useCallback(() => {
    router.push('/');
  }, []);
  return (
    <Block>
      <h1 onClick={redirectHome}>Development Log</h1>
    </Block>
  );
}

const Block = styled.header`
  display: flex;
  box-shadow: 1px 1px 10px 2px ${palette.gray1};
  h1 {
    padding: 1rem;
    &:hover {
      cursor: pointer;
    }
  }
  ${media.xsmall} {
    padding: 0;
  }
  ${media.medium} {
    padding-left: 3vw;
  }
`;

export default Header;
