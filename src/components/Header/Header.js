/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import fixoLogo from './fixo.png';
import s from './Header.css';

function Header() {

  let rightSideComponents;

  if (true) {
    rightSideComponents = [ { id: 0, text: "Perfil", href: "#" } , { id: 1, text: "Cerrar Sesión", href: "#" }]
  } else {
    rightSideComponents = [ { id: 2, text: "Iniciar Sesión", href: "#" } , { id: 3, text: "Registrarse", href: "#" } ];
  }

  return (
      <div>
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand className={classNames(s.headerHeight)}>
              <img
                src={fixoLogo}
                height="200px"
                width="80px"
              />
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <ul className={classNames(s.noListStyle)}>
                {rightSideComponents.map( (navbarLink) => { return <li className={classNames(s.rightLinks)}><a key={navbarLink.id} href={navbarLink.href}> { navbarLink.text } </a></li> } ) }
              </ul>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
}

export default withStyles(s)(Header);
