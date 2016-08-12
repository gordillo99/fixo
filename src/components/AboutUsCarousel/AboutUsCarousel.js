import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Carousel, Jumbotron, Image } from 'react-bootstrap';
import guatemalaImage from './images/guate-night.jpg';
import programmingImage from './images/programming.jpg';
import fixoWhite from './images/fixo-white.png';
import dollarsImage from './images/dollars.jpg';
import s from './AboutUsCarousel.css';

export default class AboutUsCarousel extends Component {

  render() {
  	const Item = Carousel.Item;
  	const Caption = Carousel.Caption;
    return (
      <div className={cx(s.root)}>
      	<Carousel interval={5000} pauseOnHover={false}>
			    <Item>
			    	<div className={s.centralizedDiv}>
			    		<h1 className={s.header}>Operando orgullosamente en Guatemala</h1>
			      	<Image className={s.carouselImage} width={800} height={400} alt='Guatemala' src={guatemalaImage}/>
			      </div>
			      <Caption>
			        <img width={190} height={165} alt='fixo' src={fixoWhite} />
			      </Caption>
			    </Item>
			    <Item>
			    	<div className={s.centralizedDiv}>
			    		<h1 className={s.header}>Usamos tecnología de punta</h1>
			      	<Image className={s.carouselImage} width={800} height={400} alt='Programming' src={programmingImage}/>
			      </div>
			      <Caption>
			        <img width={190} height={165} alt='fixo' src={fixoWhite} />
			      </Caption>
			    </Item>
			  </Carousel>
      </div>
    );
  }
}

export default withStyles(s)(AboutUsCarousel);