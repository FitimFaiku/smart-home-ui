import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Section from './Section';

let wrapper: ShallowWrapper;

describe('SMOKE', () => {
  beforeEach(() => {
    wrapper = shallow(<Section id="test" title={'Title'} img={'pic'} />);
  });

  test('should render root element', () => {
    expect(wrapper.find('.Section')).toHaveLength(1);
  });

  test('should render title', () => {
    expect(wrapper.find('.Section__title')).toHaveLength(1);
  });

  describe('CONDITIONAL', () => {
    test('should render and enlarge the image', () => {
      wrapper.setState({ isEnlarged: true });
      expect(wrapper.find('#section-image-id').prop('className')).toEqual('Section__image Section__image--enlarged');
    });

    test('should not render img', () => {
      wrapper.setProps({ img: null });
      expect(wrapper.find('#section-image-id')).toHaveLength(0);
    });
  });

  describe('SIMULATING', () => {
    test('should enlarge the image onCLick', () => {
      wrapper
        .update()
        .find('#section-image-id')
        .simulate('click');
      expect(
        wrapper
          .update()
          .find('#section-image-id')
          .hasClass('Section__image--enlarged')
      ).toBe(true);
    });

    test('should shrink the image onCLick', () => {
      wrapper.setState({ isEnlarged: true });
      wrapper.find('.Section__image').simulate('click');
      expect(wrapper.find('#section-image-id').hasClass('Section__image--enlarged')).toBe(false);
    });
  });
});
