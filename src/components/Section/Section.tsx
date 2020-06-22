import React, { Component } from 'react';
import Icon from '../Icon/Icon';
import { classy } from '../../utility/formatHandler';

export interface ISectionProps {
  id: string;
  className?: string;
  color?: string;
  title?: string;
  children?: React.ReactNode;
  srOnly?: boolean;
  imgTransitionToSmallOnMount?: boolean;
  img?: string;
  alt?: string;
  figcaption?: string;
  removePaddingTop?: boolean;
  removePaddingBottom?: boolean;
  backLink?: boolean;
  linkText?: string;
  icon?: string;
  sectionClassName?: string;
  iconBeforeTitle?: string;
  handleClick?: () => void;
}

export interface ISectionState {
  isEnlarged: boolean;
}

class Section extends Component<ISectionProps, ISectionState> {
  state: ISectionState = { isEnlarged: false };

  onImageLoaded = () => {
    if (this.props.imgTransitionToSmallOnMount) {
      this.setState({ isEnlarged: false });
    }
  };

  componentDidMount(): void {
    if (this.props.imgTransitionToSmallOnMount) {
      this.setState({ isEnlarged: true });
    }
  }

  handleFigureImage = () => {
    this.setState({ isEnlarged: !this.state.isEnlarged });
  };

  render() {
    const { isEnlarged } = this.state;

    const {
      id,
      color,
      className,
      img,
      alt,
      title,
      children,
      srOnly,
      figcaption,
      removePaddingTop,
      removePaddingBottom,
      backLink,
      linkText,
      handleClick,
      iconBeforeTitle,
      icon,
      sectionClassName,
      ...other
    } = this.props;

    let modifier = '';
    if (color === 'warmgrey') {
      modifier = 'Section--warmgrey';
    }

    let addClass = '';
    if (className) {
      addClass = className;
    }

    const paddingTop = removePaddingTop ? '' : 'Section__padding-top';
    const paddingBottom = removePaddingBottom ? '' : 'Section__padding-bottom';

    const rootClasses = [
      'Section',
      modifier || null,
      paddingTop || null,
      paddingBottom || null,
      sectionClassName || null,
    ];

    const imgClasses = ['Section__image', isEnlarged ? 'Section__image--enlarged' : null];

    const titleBoxClasses = ['Section__title-box', srOnly ? 'sr-only' : null];

    const sectionContentClasses = ['Section__content', addClass || null];

    return (
      <>
        {img ? (
          <figure className={`Section__image-box`} onClick={this.handleFigureImage}>
            <img
              id={'section-image-id'}
              className={classy(imgClasses)}
              src={img}
              alt={alt}
              {...other}
              onClick={this.handleFigureImage}
              onLoad={this.onImageLoaded}
            />
            <figcaption>{figcaption}</figcaption>
          </figure>
        ) : null}
        {icon && (
          <div className="Section__icon-container">
            <Icon icon={icon} />
          </div>
        )}
        <section id={`${id}-section-id`} className={classy(rootClasses)}>
          {iconBeforeTitle && (
            <div className="Section__icon-container">
              <Icon icon={iconBeforeTitle} />
            </div>
          )}
          {title ? (
            <div className={classy(titleBoxClasses)}>
              <h2 id={`${id}-section-title-id`} className="Section__title" tabIndex={-1}>
                {title}
              </h2>
            </div>
          ) : null}
          <div className={classy(sectionContentClasses)}>{children}</div>
          {modifier ? <div className="Section__background" /> : null}
        </section>
      </>
    );
  }
}

export default Section;
