import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Glyphicon } from 'react-bootstrap';
import full from './images/star_full.png';
import half from './images/star_half.png';
import empty from './images/star_empty.png';
import $ from 'jquery';
import s from './StarDisplayer.css';

export default class StarDisplayer extends Component {

	render() {
		let starDisplay = null;
    let starNumber = (Math.round(parseFloat(this.props.starAmount) * 2) / 2).toFixed(1).toString();
    console.log(`star number: ${starNumber}`);
		switch (starNumber) {
      case '0.0':
        starDisplay = <ul className={s.noListStyle}>
	        							<li className={s.inlineEles}><img src={empty} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={empty} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={empty} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={empty} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={empty} width={15} height={15}/></li>
                      </ul>
        break;
      case '0.5':
        starDisplay = <ul className={s.noListStyle}>
	        							<li className={s.inlineEles}><img src={half} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={empty} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={empty} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={empty} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={empty} width={15} height={15}/></li>
                      </ul>
        break;
      case '1.0':
         starDisplay = <ul className={s.noListStyle}>
	        							<li className={s.inlineEles}><img src={full} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={empty} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={empty} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={empty} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={empty} width={15} height={15}/></li>
                      </ul>
        break;
      case '1.5':
        starDisplay = <ul className={s.noListStyle}>
	        							<li className={s.inlineEles}><img src={full} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={half} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={empty} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={empty} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={empty} width={15} height={15}/></li>
                      </ul>
        break;
      case '2.0':
        starDisplay = <ul className={s.noListStyle}>
	        							<li className={s.inlineEles}><img src={full} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={full} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={empty} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={empty} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={empty} width={15} height={15}/></li>
                      </ul>
        break;

      case '2.5':
        starDisplay = <ul className={s.noListStyle}>
	        							<li className={s.inlineEles}><img src={full} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={full} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={half} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={empty} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={empty} width={15} height={15}/></li>
                      </ul>
        break;
      case '3.0':
        starDisplay = <ul className={s.noListStyle}>
	        							<li className={s.inlineEles}><img src={full} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={full} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={full} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={empty} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={empty} width={15} height={15}/></li>
                      </ul>
        break;

      case '3.5':
        starDisplay = <ul className={s.noListStyle}>
	        							<li className={s.inlineEles}><img src={full} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={full} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={full} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={half} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={empty} width={15} height={15}/></li>
                      </ul>
        break;
      
      case '4.0':
        starDisplay = <ul className={s.noListStyle}>
	        							<li className={s.inlineEles}><img src={full} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={full} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={full} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={full} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={empty} width={15} height={15}/></li>
                      </ul>
        break;

      case '4.5':
        starDisplay = <ul className={s.noListStyle}>
	        							<li className={s.inlineEles}><img src={full} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={full} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={full} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={full} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={half} width={15} height={15}/></li>
                      </ul>
        break;
      case '5.0':
        starDisplay = <ul className={s.noListStyle}>
	        							<li className={s.inlineEles}><img src={full} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={full} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={full} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={full} width={15} height={15}/></li>
	                      <li className={s.inlineEles}><img src={full} width={15} height={15}/></li>
                      </ul>
        break;
      default:
        starDisplay = null;
        break;
    }

		return(
			<div>
				{starDisplay}
			</div>
		);
	}
}

export default withStyles(s)(StarDisplayer);