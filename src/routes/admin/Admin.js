import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { Jumbotron, Tabs, Tab} from 'react-bootstrap';
import UserEdit from '../../components/adminComponents/UserEdit';
import FixerEdit from '../../components/adminComponents/FixerEdit';
import FixerCreate from '../../components/adminComponents/FixerCreate';
import $ from 'jquery';
import s from './Admin.css';

export default class Admin extends Component {

	constructor(props) {
		super(props);
		this.state = {
			fixers: [],
			users: [],
			proposals: [],
			areas: [],
			categories: [],
			newFixer: {
				firstname: '',
				lastname: '',
				email: '',
				age: 0,
				gender: 0,
				description: '',
				phone: ''
			}
		};
	}

	_updateProperty(index, targetType, property, event) {
		let arr;

		switch(targetType) {
			case 'fixer':
				arr = this.state.fixers;
				break;
			case 'user':
				arr = this.state.users;
				break;
			case 'proposal':
				arr = this.state.proposals;
				break;
			default:
				arr = null;
		}
		console.log(arr[index][property]);
		console.log(event.target.value);
		arr[index][property] = event.target.value;
		this.setState( { [targetType]: arr } );
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

	componentDidMount() {
		$.ajax({
    	url: '/api/users/crud/',
    	type: 'GET',
    	dataType: 'json',
    	cache: false,
    	success: function(data) {
    		this.setState( { users: data } );
    	}.bind(this),
    	error: function(xhr, status, err) {
     		console.log(err);
    	}.bind(this)
	  });

		$.ajax({
    	url: '/api/fixers/crud/',
    	type: 'GET',
    	dataType: 'json',
    	cache: false,
    	success: function(data) {
    		console.log(data);
    		this.setState( { fixers: data } );
    	}.bind(this),
    	error: function(xhr, status, err) {
     		console.log(err);
    	}.bind(this)
	  });

	  $.ajax({
    	url: '/api/areas/crud/',
    	type: 'GET',
    	dataType: 'json',
    	cache: false,
    	success: function(data) {
    		this.setState( { areas: data } );
    	}.bind(this),
    	error: function(xhr, status, err) {
     		console.log(err);
    	}.bind(this)
	  });

	  $.ajax({
    	url: '/api/categories/crud/',
    	type: 'GET',
    	dataType: 'json',
    	cache: false,
    	success: function(data) {
    		this.setState( { categories: data } );
    	}.bind(this),
    	error: function(xhr, status, err) {
     		console.log(err);
    	}.bind(this)
	  });
	}

	render() {

		let userContent = <div className={classNames(s.tabContent)}>
												{this.state.users.map( (user, index) => {
													return (
																<UserEdit className={classNames(s.tabContentElement)}
																	id={user.id}
																	email={user.email}
																	firstName={user.firstname}
																	lastName={user.lastname}
																	userType={user.usertype}
																	update={this._updateProperty.bind(this, index)}
																	updateInDb={this._updateUserInDb.bind(this, index)}
																/>);
												})}
											</div>

		let fixerContent = <div className={classNames(s.tabContent)}>

												{this.state.fixers.map( (fixer, index) => {
													return (
																<FixerEdit className={classNames(s.tabContentElement)}
																	id={fixer.id}
																	email={fixer.email}
																	firstName={fixer.firstname}
																	lastName={fixer.lastname}
																	update={this._updateProperty.bind(this, index)}
																	description={fixer.description}
																	age={fixer.age}
																	gender={fixer.gender}
																	phone={fixer.phone}
																	profilepic={fixer.profilepic}
																	areas={this.state.areas}
																	categories={this.state.categories}
																	//updateInDb={}
																/>);
												})}
											 </div>	

		let proposalContent = <div>
													</div>
		let offerContent = <div>
											 </div>							

		const tabsInstance = (
		  <Tabs defaultActiveKey={1} id='admin-tabs'>
		    <Tab eventKey={1} title='Usuarios'>
		    	{userContent}
		    </Tab>
		    <Tab eventKey={2} title='Fixers'>
		    	{fixerContent}
		    </Tab>
		    <Tab eventKey={3} title='Propuestas'>
		    	{proposalContent}
		    </Tab>
		    <Tab eventKey={4} title='Ofertas'>
		    	{offerContent}
		    </Tab>
		  </Tabs>
		);

	  return (
	    <div className={s.root}>
	    	<Jumbotron className={s.stripeJumbotron}>
		      <div className={s.container}>
		      	<h1 className={s.adminPageHeader}>Admin</h1>
		      	{tabsInstance}

		        <div className={s.leftAligned}>

		        </div>
		      </div>
	     </Jumbotron>
	    </div>
	  );
	}
}

export default withStyles(s)(Admin);