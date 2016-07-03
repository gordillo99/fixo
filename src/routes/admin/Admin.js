import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Admin.css';

const title = 'Admin';

function Admin(props, context) {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>Admin</h1>
        <p>...</p>
      </div>
    </div>
  );
}

export default withStyles(s)(Admin);