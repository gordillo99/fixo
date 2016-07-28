import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import ProposalCard from '../ProposalCard';
import s from './ProfileProposals.css';
import $ from 'jquery';

export default class ProfileProposals extends Component {

  constructor(props) {
    super();
    this.state = {
      proposals: []
    };
  }

  componentDidMount() {
    $.ajax({
      url: `/api/proposals/get/${this.props.id}`,
      type: 'GET',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({ proposals: data });
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
      }.bind(this)
    });
  }

  render() {
    return (
      <div className={s.root}>
        <div className={classNames(s.centralizedDiv)}>
          <h2>Propuestas</h2>
          {this.state.proposals.map((proposal, counter) => {
            return <ProposalCard 
              key={`proposalCard${counter}`}
              proposal={proposal}
              counter={counter+1}
            />;
          })}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ProfileProposals);