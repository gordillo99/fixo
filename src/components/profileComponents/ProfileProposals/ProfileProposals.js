import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Col, Row } from 'react-bootstrap';
import ProposalCard from '../ProposalCard';
import s from './ProfileProposals.css';
import $ from 'jquery';

export default class ProfileProposals extends Component {

  constructor(props) {
    super();
    this.state = {
      proposals: [],
      resultTitle: <h3>Cargando datos...</h3>,
      noResults: true
    };
  }

  componentDidMount() {
    $.ajax({
      url: `/api/proposals/get/${this.props.id}`,
      type: 'GET',
      dataType: 'json',
      cache: false,
      success: function(data) {
        let noData = false;
        let titleToShow = null;
        if (data.length === 0) {
          noData = true;
          titleToShow = <h3>No se encontraron resultados</h3>;
        }
        this.setState({ proposals: data, resultTitle: titleToShow, noResults: noData });
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
      }.bind(this)
    });
  }

  render() {
    let resultTitle = null;
    if (this.state.noResults) {
      resultTitle = this.state.resultTitle;
    }
    return (
      <div className={s.root}>
        <div className={cx(s.centralizedDiv)}>
          <h2>Tus propuestas</h2>
          {resultTitle}
          <Row className={s.row}>
            <Col md={5} xs={12} className={s.centerBlock}>
              <div className={s.centeringDiv}>
                {this.state.proposals.map((proposal, counter) => {
                  return <ProposalCard 
                    key={`proposalCard${counter}`}
                    proposal={proposal}
                    counter={counter+1}
                  />;
                })}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ProfileProposals);