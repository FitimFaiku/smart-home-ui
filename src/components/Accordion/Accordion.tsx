import React, { Component, Children, cloneElement, ReactElement } from 'react';
import { IAccordionItemParentProps } from './AccordionItem/AccordionItem';

interface IAccordionProps {
  /** id prop */
  id: string;
  className?: string;
  allowMultipleOpen?: boolean;
  name?: string;
  heading?: any;
  activeTab?: number;
  onActiveTabChange?: (index: number) => void;
}

export interface IAccordionState {
  activeTab: number;
}

class Accordion extends Component<IAccordionProps, IAccordionState> {
  state: IAccordionState = { activeTab: -1 };

  componentDidUpdate(prevProps: IAccordionProps) {
    if (prevProps.name !== this.props.name) {
      this.setState({ activeTab: -1 });
    }
  }

  handleAccordionOnClick = (index: number) => {
    this.setState(
      (prev: IAccordionState) => ({
        activeTab: prev.activeTab === index ? -1 : index,
      }),
      () => {
        this[`accordionItem${index}`].scrollIntoView();
      }
    );
  };

  createDiv() {
    const { id, children, allowMultipleOpen, activeTab, onActiveTabChange } = this.props;

    return Children.map(children, (children: any, index: number) => {
      return cloneElement(children, {
        index,
        name: id,
        key: index,
        activeTab: onActiveTabChange ? activeTab : this.state.activeTab,
        allowMultipleOpen: allowMultipleOpen,
        handleAccordionOnClick: onActiveTabChange || this.handleAccordionOnClick.bind(this, index),
        ref: e => {
          this[`accordionItem${index}`] = e;
        },
      });
    });
  }

  render() {
    const { id, className } = this.props;

    return (
      <dl id={`${id}-accordion-id`} className={`Accordion ${className ? className : ''}`}>
        {this.createDiv()}
      </dl>
    );
  }
}

export default Accordion;
