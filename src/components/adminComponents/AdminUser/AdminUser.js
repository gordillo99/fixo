import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { arrBuffToBase64 } from '../../../helpers/helpers.js';
import UserEdit from '../UserEdit';
import $ from 'jquery';
import s from './AdminUser.css';

export default class AdminUsert extends Component {

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

	_updateUserInDb(index) {
		let user = this.state.users[index];
		$.ajax({
    	url: '/api/users/crud/',
    	type: 'POST',
    	dataType: 'json',
    	cache: false,
    	data: {
    		id: user.id,
    		usertype: user.usertype
    	},
    	success: function() {
    		console.log('User updated successfully!');
    		alert('El usuario fue actualizado exitosamente!');
    	}.bind(this),
    	error: function(xhr, status, err) {
    		alert(err);
     		console.log(err);
    	}.bind(this)
	  });
	}

	render() {
		return(
			<div className={classNames(s.tabContent)}>
				{this.state.users.map( (user, index) => {
					return (
								<UserEdit className={classNames(s.tabContentElement)}
									id={user.id}
									email={user.email}
									firstName={user.firstname}
									lastName={user.lastname}
									userType={user.usertype}
									update={this.props._updateProperty.bind(this, index)}
									updateInDb={this._updateUserInDb.bind(this, index)}
								/>);
				})}
			</div>);
	}
}

export default withStyles(s)(AdminUsert);