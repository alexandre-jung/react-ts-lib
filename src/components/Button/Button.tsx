import React, { FC } from 'react';

import styles from './Button.module.scss';
import { ButtonProps } from './Button.types';

const Button: FC<ButtonProps> = ({ type, text, onClick }) => {
  const typeClassName = styles[`Button-${type}`];

  return (
    <button type="button" className={`${styles.Button} ${typeClassName}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
