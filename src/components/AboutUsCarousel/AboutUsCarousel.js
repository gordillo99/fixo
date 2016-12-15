import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Carousel, Jumbotron, Image } from 'react-bootstrap';
import guatemalaImage from './images/guatemala-night.jpg';
import programmingImage from './images/programming1.png';
import gardeningImage from './images/gardening.jpg';
import entrepreneurImage from './images/emprendimiento.jpg';
import fixoWhite from './images/fixo-white.png';
import tools from './images/banner1.png';
import toolsmob from './images/bannermob1.png';
import s from './AboutUsCarousel.css';
import $ from 'jquery';

export default class AboutUsCarousel extends Component {

	_generateCarousel() {
		const Item = Carousel.Item;
  	const Caption = Carousel.Caption;
		const carouselArray = [
			{
				line: 'Operando orgullosamente en Guatemala',
				alt: 'Guatemala',
				image: guatemalaImage
			},
			{
				line: 'Ayudamos a fixers a encontrar más trabajo',
				alt: 'Gardening',
				image: gardeningImage
			},
			{
				line: 'Somos emprendimiento social',
				alt: 'Emprendimiento',
				image: entrepreneurImage
			},
			{
				line: 'Usamos tecnología de punta',
				alt: 'Programming',
				image: programmingImage
			},
		];

		return carouselArray.map((item, index) => {
			return(
				<Item key={`carousel-item-${index}`}>
					<div key={`carousel-div-${index}`} className={s.centralizedDiv}>
						<h1 className={s.header} key={`carousel-titles-${index}`}>{item.line}</h1>
						<Image key={`carousel-image-${index}`} className={s.carouselImage} width={700} height={400} alt={item.alt} src={item.image}/>
					</div>
					<Caption key={`carousel-caption-${index}`}>
						<img key={`carousel-logo-${index}`} width={180} height={145} alt='fixo' src={fixoWhite} />
					</Caption>
				</Item>
			);
		});
	}

  render() {
		/*let divStyle = {
      backgroundImage: `url(${tools})`
    }*/
		
    return (
      <div className={cx(s.root)}>
      	<div className={s.leftAligned}>
					<img className={cx(s.stripeImage, s.mobileInvisible)} src={tools} />
					<img className={cx(s.stripeImage, s.mobileVisible)} src={toolsmob} />
				</div>
      </div>
    );
  }
}

export default withStyles(s)(AboutUsCarousel);
