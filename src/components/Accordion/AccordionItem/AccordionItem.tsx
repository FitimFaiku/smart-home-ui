import React, { Component } from 'react';
import Icon from '../../Icon/Icon';
import { classy } from '../../../utility/formatHandler';

export interface IAccordionItemProps {
  title: string | JSX.Element;
  titleDescription?: string | JSX.Element;
  children: React.ReactNode;
  errorMessage?: {
    title: string;
    description?: string;
  };
  icon?: string;
}

export interface IAccordionItemParentProps {
  handleAccordionOnClick?: any;
  activeTab?: number;
  allowMultipleOpen?: boolean;
  index?: number;
  name?: string;
  ref?: any;
}

export interface IAccordionItemState {
  open: boolean;
}

class AccordionItem extends Component<IAccordionItemProps & IAccordionItemParentProps, IAccordionItemState> {
  state: IAccordionItemState = { open: false };

  accordionItemRef = React.createRef<HTMLDivElement>();

  handleAccordionOnClick = () => {
    this.setState((prevState: IAccordionItemState) => ({
      open: !prevState.open,
    }));
  };

  render() {
    const {
      children,
      name,
      allowMultipleOpen,
      activeTab,
      icon,
      index,
      handleAccordionOnClick,
      title,
      titleDescription,
      errorMessage,
    } = this.props;
    const isActive = allowMultipleOpen ? this.state.open : activeTab === index;

    const buttonClasses = ['Accordion__button'];
    if(isActive){
      buttonClasses.push("Accordion__button--open")
    }

    const ddClasses = ['Accordion__item-content'];

    const button = (
      <button
        className={classy(buttonClasses)}
        aria-expanded={isActive}
        aria-controls={`${name}-accordion-dd-${index}-id`}
        onClick={allowMultipleOpen ? () => this.handleAccordionOnClick() : () => handleAccordionOnClick(index)}
      >
        <span className="Accordion__button-title">
          {icon && <Icon className={'Accordion__icon--optional'} icon={icon} />}
          <span>
            {titleDescription && <strong className="Accordion__button-title-header">{titleDescription}</strong>}
            {title}
            {errorMessage && (
              <span className={`Accordion__error-message`}>
                <strong>Achtung</strong>: {errorMessage.title}
              </span>
            )}
          </span>
          <Icon icon={isActive ? 'minus' : 'plus'} />
        </span>
        {isActive && errorMessage && <span className={`Accordion__error-description`}>{errorMessage.description}</span>}
      </button>
    );

    return (
      <div className={'Accordion__item'} key={`${name}-${index}`} ref={this.accordionItemRef}>
        <dt className={'Accordion__item-header'}>{button}</dt>
        <dd id={`${name}-accordion-dd-${index}-id`} className={classy(ddClasses)} hidden={!isActive}>
          {children}
        </dd>
      </div>
    );
  }
}

export default AccordionItem;
