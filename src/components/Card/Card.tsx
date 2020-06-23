import React, { Component } from 'react';
import CardHeader from './CardHeader/CardHeader';
import CardBody from './CardBody/CardBody';
import { classy } from '../../utility/formatHandler';

interface ICardProps {
  id: string;
  active?: boolean;
  className?: string;
  children?: React.ReactNode;
  selected?: number;
  plain?: boolean;
  background?: boolean;
}

const Card : React.FC<ICardProps> = props => {

  const augmentChildren = (children) => {
    const { id, selected } = props;
    return React.Children.map(children, (child, idx) => {
      if (typeof child.type === 'function') {
        return React.cloneElement(child, {
          id,
          key: `${id}-${idx}`,
          selected,
        });
      } else {
        return React.cloneElement(child, {
          key: `${id}-${idx}`,
        });
      }
    });
  };
  const {
    id,
    active,
    className,
    plain,
    children,
    background
  } = props;

  const classes = [
    'Card',
    active ? 'Card--active' : null,
    className || null,
    plain ? 'Card--plain' : null,
    background ? 'Card--background' : null,
  ];

  return(
      <article id={`${id}-card-id`} className={classy(classes)}>
        {augmentChildren(children)}
      </article>
  );
};

export default Card;
