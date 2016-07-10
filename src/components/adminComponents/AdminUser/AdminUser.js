import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { arrBuffToBase64 } from '../../../helpers/helpers.js';
import UserEdit from '../UserEdit';
import $ from 'jquery';
import s from './AdminUser.css';

export default class AdminUser extends Component {

	constructor(props) {
		super(props);
		this.state = {
			users: []
		};
	}

	componentDidMount() {
		$.ajax({
    	url: '/api/users/crud/',
    	type: 'GET',
    	dataType: 'json',
    	cache: false,
    	success: function(data) {
    		console.log(data);
    		this.setState( { users: data } );
    	}.bind(this),
    	error: function(xhr, status, err) {
     		console.log(err);
    	}.bind(this)
	  });
	}

	render() {
		return(
			<div className={classNames(s.tabContent)}>
				{this.state.users.map( (user, index) => {
					return (
								<UserEdit key={'userEdit-' + index} className={classNames(s.tabContentElement)}
									id={user.id}
									email={user.email}
									firstname={user.firstname}
									lastname={user.lastname}
									usertype={user.usertype}
								/>);
				})}
			</div>);
	}
}

export default withStyles(s)(AdminUser);