import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import MainPageStripe1 from './../../components/MainPageStripe1';
import MainPageStripe2 from './../../components/MainPageStripe2';
import MainPageStripe3 from './../../components/MainPageStripe3';
import AboutUsCarousel from './../../components/AboutUsCarousel';
import BeAFixerStripe from './../../components/BeAFixerStripe';
import s from './Home.css';

export class Home extends Component {

  render() {
    return (
      <div className={s.root}>
        <div className={cx(s.centralizedDiv)}>
          <MainPageStripe1 />
          <MainPageStripe2 />
          <AboutUsCarousel />
          <MainPageStripe3 />
          <BeAFixerStripe />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);