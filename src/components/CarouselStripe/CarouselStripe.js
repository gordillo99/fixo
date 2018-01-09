import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Carousel } from 'react-bootstrap';
import image1 from './image-1.jpeg';
import image2 from './image-2.jpeg';
import s from './CarouselStripe.style';

export class CarouselStripe extends Component {

  render() {
    const Item = Carousel.Item;
    const Caption = Carousel.Caption;
    return (
      <div>
        <Carousel controls={false} indicators={false} interval={1000} pauseOnHover={false}>
          <Item >
            <img className={s.carouselImage} src={image1}/>
          </Item>

          <Item >
            <img className={s.carouselImage} src={image2}/>
          </Item>

          <Item >
            <img className={s.carouselImage} src={image1}/>
          </Item>
        </Carousel>
      </div>
    );
  }
}

export default withStyles(s)(CarouselStripe);