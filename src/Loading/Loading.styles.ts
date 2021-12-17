import styled, { keyframes } from 'styled-components';

export const SpinnerBase = styled.div`
  color: inherit;
  display: inline-block;
  position: absolute;
`;

const ballBeat = keyframes`
  50% {
    opacity: 0.2;
    transform: scale(0.75);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

export const BallBeat = styled.div`
  color: inherit;

  div {
    color: inherit;
  }

  & > div {
    animation: ${ballBeat} 1s 0s infinite linear both;
    background-color: currentColor;
    border-radius: 100%;
    display: inline-block;
    height: 15px;
    margin: 2px;
    width: 15px;

    &:nth-child(2n-1) {
      animation-delay: -0.6s !important;
    }
  }
`;
