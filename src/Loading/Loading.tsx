import React from 'react';
import { SpinnerBase, BallBeat } from './Loading.styles';

export const Loading: React.FC<React.ComponentPropsWithoutRef<'div'>> = (props) => {
  return (
    <SpinnerBase {...props}>
      <BallBeat>
        <div />
        <div />
        <div />
      </BallBeat>
    </SpinnerBase>
  );
};

export default Loading;
