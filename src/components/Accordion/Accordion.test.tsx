import React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import Accordion from './Accordion';
import AccordionItem from './AccordionItem/AccordionItem';

let wrapper: ReactWrapper;

describe('SMOKE accordion', () => {
  beforeEach(() => {
    wrapper = mount(
      <Accordion id="test" name="test-faq">
        <AccordionItem name={'testItemContent'} title={'blabla'}>
          child
        </AccordionItem>
        <AccordionItem name={'testItem'} title={'test'}>
          child
        </AccordionItem>
      </Accordion>
    );
  });

  test('should render button', () => {
    expect(wrapper.find('.Accordion__button')).toHaveLength(2);
  });

  test('should render Item', () => {
    expect(wrapper.find('.Accordion__item-content')).toHaveLength(2);
  });

  describe('SIMULATE', () => {
    test('should open accordion item', () => {
      wrapper.find('.Accordion__button').at(1).simulate('click', { index: 1 });
      expect(wrapper.find('.Accordion__button--open')).toHaveLength(1);
    });

    test('should close previously opened accordion item ', () => {
      wrapper.setState({ activeTab: 1 });
      wrapper.find('.Accordion__button').at(1).simulate('click', { index: 1 });
      expect(wrapper.find('.Accordion__button--open')).toHaveLength(0);
    });
  });
});

describe('Controlled accordion', () => {
  test('should show accordion item', () => {
    wrapper = mount(
      <Accordion id="test" activeTab={1} onActiveTabChange={() => {}} name="test-faq">
        <AccordionItem name={'testItemContent'} title={'blabla'}>
          child
        </AccordionItem>
        <AccordionItem name={'testItem'} title={'test'}>
          child
        </AccordionItem>
      </Accordion>
    );
    expect(wrapper.find('.Accordion__button--open')).toHaveLength(1);
  });
});
