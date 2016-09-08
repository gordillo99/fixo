import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Carousel, Jumbotron, Image } from 'react-bootstrap';
import guatemalaImage from './images/guate-night.jpg';
import programmingImage from './images/programming.jpg';
import gardeningImage from './images/gardening.jpg';
import entrepreneurImage from './images/emprendimiento.jpg';
import fixoWhite from './images/fixo-white.png';
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
			      	<Image className={s.carouselImage} width={700} height={400} alt='Guatemala' src={guatemalaImage}/>
			      </div>
			      <Caption>
			        <img width={180} height={145} alt='fixo' src={fixoWhite} />
			      </Caption>
			    </Item>
					<Item>
			    	<div className={s.centralizedDiv}>
			    		<h1 className={s.header}>Ayudamos a fixers a encontrar más trabajo</h1>
			      	<Image className={s.carouselImage} width={700} height={400} alt='Gardening' src={gardeningImage}/>
			      </div>
			      <Caption>
			        <img width={180} height={145} alt='fixo' src={fixoWhite} />
			      </Caption>
			    </Item>
					<Item>
			    	<div className={s.centralizedDiv}>
			    		<h1 className={s.header}>Somos emprendimiento social</h1>
			      	<Image className={s.carouselImage} width={700} height={400} alt='Emprendimiento' src={entrepreneurImage}/>
			      </div>
			      <Caption>
			        <img width={180} height={145} alt='fixo' src={fixoWhite} />
			      </Caption>
			    </Item>
			    <Item>
			    	<div className={s.centralizedDiv}>
			    		<h1 className={s.header}>Usamos tecnología de punta</h1>
			      	<Image className={s.carouselImage} width={700} height={400} alt='Programming' src={programmingImage}/>
			      </div>
			      <Caption>
			        <img width={180} height={145} alt='fixo' src={fixoWhite} />
			      </Caption>
			    </Item>
			  </Carousel>
      </div>
    );
  }
}

export default withStyles(s)(AboutUsCarousel);