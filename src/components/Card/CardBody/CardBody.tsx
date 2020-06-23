import React from 'react';

interface ICardBodyProps {
  children?: any;
  id?: string;
  selected?: number;
  customClass?: string;
}

const CardBody = (props: ICardBodyProps) => {
  const { children, customClass } = props;

  return (
    <div className={`Card__body ${customClass || ''}`} aria-live="polite">
      {children}
    </div>
  );
};

export default CardBody;
