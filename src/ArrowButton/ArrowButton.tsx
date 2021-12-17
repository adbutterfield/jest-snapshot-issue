import React from 'react';
import Loading from '../Loading';

export type ArrowButtonProps = {
  loading?: boolean;
} & (React.ComponentPropsWithoutRef<'button'>);

const ArrowButton: React.FC<ArrowButtonProps> = (props) => {
  const {
    children,
    loading = false,
    ...rest
  } = props;

  return (
    <button {...rest}>
      {children}
      {loading ? <Loading /> : null}
    </button>
  );
};

ArrowButton.defaultProps = {
  loading: false,
};

export default ArrowButton;
