import styled, { css } from 'styled-components';

export const ArrowButtonBase = styled.button<{ loading: boolean; disabled: boolean}>`
  ${({ loading }) => loading && }
`;