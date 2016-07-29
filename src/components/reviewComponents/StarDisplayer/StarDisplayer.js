import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { Glyphicon } from 'react-bootstrap';
import $ from 'jquery';
import s from './StarDisplayer.css';

export default class StarDisplayer extends Component {

	render() {
		let starDisplay = null;

		switch (Number(this.props.starAmount)) {
      case 1:
        starDisplay = <Glyphicon glyph="star" />;
        break;
      case 2:
        starDisplay = <ul className={s.noListStyle}>
	        							<li className={s.inlineEles}><Glyphicon glyph="star" /></li>
	                      <li className={s.inlineEles}><Glyphicon glyph="star" /></li>
                      </ul>
        break;
      case 3:
         starDisplay = <ul className={s.noListStyle}>
	         							 <li className={s.inlineEles}><Glyphicon glyph="star" /></li>
	                       <li className={s.inlineEles}><Glyphicon glyph="star" /></li>
	                       <li className={s.inlineEles}><Glyphicon glyph="star" /></li>
                       </ul>
        break;
      case 4:
        starDisplay = <ul className={s.noListStyle}>
	        							<li className={s.inlineEles}><Glyphicon glyph="star" /></li>
	                      <li className={s.inlineEles}><Glyphicon glyph="star" /></li>
	                      <li className={s.inlineEles}><Glyphicon glyph="star" /></li>
	                      <li className={s.inlineEles}><Glyphicon glyph="star" /></li>
                      </ul>
        break;
      case 5:
        starDisplay = <ul className={s.noListStyle}>
	        							<li className={s.inlineEles}><Glyphicon glyph="star" /></li>
	                      <li className={s.inlineEles}><Glyphicon glyph="star" /></li>
	                      <li className={s.inlineEles}><Glyphicon glyph="star" /></li>
	                      <li className={s.inlineEles}><Glyphicon glyph="star" /></li>
	                      <li className={s.inlineEles}><Glyphicon glyph="star" /></li>
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