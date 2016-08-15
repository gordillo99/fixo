import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import ProfileHeader from '../../components/profileComponents/ProfileHeader';
import ProfileProposals from '../../components/profileComponents/ProfileProposals';
import s from './Profile.css';
import $ from 'jquery';

export default class Profile extends Component {

	constructor() {
		super();
		this.state = {
			id: null,
      familyName: '',
      givenName: '',
      middleName: ''
    };
	}

	componentDidMount() {
		$.ajax({
      url: '/getUserId',
      type: 'GET',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState( {
        	id: data.id,
          familyName: data.name.familyName,
          givenName: data.name.givenName,
          middleName: data.name.middleName
        } );
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
      }.bind(this)
    });
	}

  render() {
  	let proposalsEle = null;

  	if (this.state.id) {
  		proposalsEle = <ProfileProposals id={this.state.id} />
  	}

    return (
    	<div>
	      <ProfileHeader />
	      {proposalsEle}
      </div>
    );
  }
}

export default withStyles(s)(Profile);