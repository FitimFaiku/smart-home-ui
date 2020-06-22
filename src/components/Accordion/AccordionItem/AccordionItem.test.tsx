import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import AccordionItem from './AccordionItem';

let wrapper: ShallowWrapper;

describe('SMOKE', () => {
  beforeEach(() => {
    wrapper = shallow(
      <AccordionItem
        titleDescription="Section header"
        title="Section name"
        errorMessage={{
          title: 'Error title',
          description: 'Error description',
        }}
        index={1}
      >
        <div>child</div>
      </AccordionItem>
    );
  });

  test('should render AccordionItem', () => {
    expect(wrapper.find('.Accordion__button')).toHaveLength(1);
  });

  test('should render AccordionItem dt element', () => {
    expect(wrapper.find('dt')).toHaveLength(1);
  });

  test('AccordionItem dd element renders', () => {
    expect(wrapper.find('dd')).toHaveLength(1);
  });
});

describe('SIMULATE', () => {
  beforeEach(() => {
    wrapper = shallow(
      <AccordionItem
        titleDescription="Section header"
        title="Section name"
        errorMessage={{
          title: 'Error title',
          description: 'Error description',
        }}
        index={1}
        allowMultipleOpen={true}
      >
        <p>blubb</p>
      </AccordionItem>
    );
  });

  test('should open accordion item', () => {
    wrapper.find('.Accordion__button').simulate('click');

    expect(wrapper.find('.Accordion__error-message')).toHaveLength(1);
    expect(wrapper.find('.Accordion__button--open')).toHaveLength(1);
    expect(wrapper.find('.Accordion__button--open')).toHaveLength(1);
  });

  test('should close accordion item', () => {
    wrapper.setState({ open: true });
    expect(wrapper.find('.Accordion__button--open')).toHaveLength(1);
    wrapper.find('.Accordion__button').simulate('click');
    expect(wrapper.find('.Accordion__button--open')).toHaveLength(0);
  });
});
