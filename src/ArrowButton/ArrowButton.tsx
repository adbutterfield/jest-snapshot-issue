import React from 'react';
import ArrowButtonBase from './ArrowButton.styles';

export type ArrowButtonProps = {
  loading?: boolean;
  disabled?: boolean;
} & (React.ComponentPropsWithoutRef<'button'>);

const ArrowButton: React.FC<ArrowButtonProps> = (props) => {
  const {
    children,
    loading = false,
    disabled = false,
    ...rest
  } = props;

  return (
    <ArrowButtonBase loading={loading} disabled={disabled} {...rest}>{children}</ArrowButtonBase>
  );
};

ArrowButton.defaultProps = {
  loading: false,
  disabled: false,
};

export default ArrowButton;
