import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Jumbotron, Tabs, Tab} from 'react-bootstrap';
import { arrBuffToBase64 } from '../../helpers/helpers.js';
import AdminUser from '../../components/adminComponents/AdminUser';
import AdminFixer from '../../components/adminComponents/AdminFixer';
import AdminProposal from '../../components/adminComponents/AdminProposal';
import $ from 'jquery';
import s from './Admin.css';

export class Admin extends Component {

	render() {					
		const tabsInstance = (
		  <Tabs defaultActiveKey={1} id='admin-tabs'>
		    <Tab eventKey={1} title='Usuarios'>
		    	<AdminUser />
		    </Tab>
		    <Tab eventKey={2} title='Fixers'>
		    	<AdminFixer />
		    </Tab>
		    <Tab eventKey={3} title='Propuestas'>
		    	<AdminProposal />
		    </Tab>
		  </Tabs>
		);

	  return (
	    <div className={s.root}>
	    	<Jumbotron className={s.stripeJumbotron}>
		      <div className={s.container}>
		      	<h1 className={s.adminPageHeader}>Admin</h1>
		      	{tabsInstance}
		      </div>
	     </Jumbotron>
	    </div>
	  );
	}
}

export default withStyles(s)(Admin);