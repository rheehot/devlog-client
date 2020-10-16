import * as React from 'react';
import styled from 'styled-components';
import SereisItemSkelleton from './SereisItemSkelleton';

type SeriesSkelletonProps = {};

const { useRef } = React;
function SeriesSkelleton(props: SeriesSkelletonProps) {
  const array = useRef<Array<number>>([1, 2, 3, 4, 5]);
  return (
    <Block>
      {array.current.map((v, i) => (
        <SereisItemSkelleton key={`series${i}`} seriesKey={i} />
      ))}
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
`;

export default SeriesSkelleton;
