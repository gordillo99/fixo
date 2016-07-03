/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import fixoLogo from './fixo.png';
import $ from 'jquery';
import s from './Navigation.css';

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  componentDidMount() {
    $.ajax({
      url: '/isLoggedIn',
      type: 'GET',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({ isLoggedIn: data });
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
      }.bind(this)
    });
  }

  _logout() {
    $.ajax({
      url: '/logout',
      type: 'GET',
      dataType: 'json',
      cache: false,
      success: function() {
        this.setState({ isLoggedIn: false });
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
      }.bind(this)
    });
  }
  
  render() {
    let rightSideComponents;

    switch (this.state.isLoggedIn.type) {
      case 'regular':
        rightSideComponents = [ { id: 0, text: "Perfil", href: "/profile" } , { id: 1, text: "Cerrar Sesión", href: "", method: this._logout.bind(this) }]
        break;
      case 'admin':
        rightSideComponents = [ { id: 3, text: "Admin", href: "/admin" }, { id: 0, text: "Perfil", href: "/profile" } , { id: 1, text: "Cerrar Sesión", href: "", method: this._logout.bind(this) }]
        break;
      default:
        rightSideComponents = [ { id: 2, text: "Iniciar Sesión", href: "/login" } ];
        break;
    }

    return (
      <div>
        <Navbar fixedTop>
          <a href='/'>
            <img
              src={fixoLogo}
              height='60px'
              width='80px'
            />
          </a>

          <Nav pullRight>
            <ul className={classNames(s.noListStyle)}>
              {rightSideComponents.map( (navbarLink) => { return <li onClick={navbarLink.method} className={classNames(s.rightLinks)} key={navbarLink.id}><a href={navbarLink.href}> { navbarLink.text } </a></li> } ) }
            </ul>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default withStyles(s)(Navigation);
