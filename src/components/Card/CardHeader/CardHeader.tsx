import React from 'react';
import { ICardHeaderProps } from './CardHeader.interface';
import Icon from '../../Icon/Icon';

const CardHeader = (props: ICardHeaderProps) => {
  const { icon, title, badge, badgeType, id, children, srOnly, srOnlyTitle } = props;

  let badgeClass;
  switch (badgeType) {
    case 'red':
      badgeClass = 'Card__badge--red';
      break;
    case 'green':
      badgeClass = 'Card__badge--green';
      break;
    case 'grey':
    default:
      badgeClass = 'Card__badge--grey';
  }

  return (
    <header className={`Card__header ${srOnly ? 'sr-only' : ''}`}>
      {badge && (
        <span className={`Card__badge ${badgeClass}`} id={`${id}-badge-id`}>
          {badge}
        </span>
      )}
      <div className="Card__container">
        {icon && (
          <div className="Card__icon">
            <Icon icon={icon} />
          </div>
        )}
        <h3 className="Card__title" aria-describedby={badge ? `${id}-badge-id` : null}>
          {title}
          {srOnlyTitle && <span className={'sr-only'}>{srOnlyTitle}</span>}
        </h3>
        <div className="Card__actions">{children}</div>
      </div>
    </header>
  );
};

export default CardHeader;
