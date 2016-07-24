import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { Col, Row, Button, Panel } from 'react-bootstrap';
import { catEnglishToSpanish } from '../../../helpers/helpers.js';
import AnswersDisplay from '../../questionComponents/AnswersDisplay';
import FixerPanel from '../../FixerPanel';
import s from './ProposalCard.css';
import $ from 'jquery';

export default class ProposalCard extends Component {

  constructor() {
    super();
    this.state = {
      addQuestionsTxt: null,
      addQuestionsImage: null,
      open: false
    };
  }

  componentDidMount() {
    console.log(this.props);
    $.ajax({
      url: `/api/proposals/get/additional_info/${this.props.proposal.id}`,
      type: 'GET',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState( { 
          addQuestionsTxt: data.addQuestionsTxt,
          addQuestionsImage: data.addQuestionsImage
        } );
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
      }.bind(this)
    });
  }

  render() {
    let dateFormat = require('dateformat');
    let answersDisplay = null;
    let qsAndAs = [];
    let createdAt = dateFormat(this.props.proposal.created_at, 'dd/mm/yyyy').toString();
    let propDate = `${dateFormat(this.props.proposal.prop_date, 'dd/mm/yyyy').toString()} en la ${(this.props.proposal.morning === 1) ? 'mañana' : 'tarde'}`;
    let fixer = {
      profilepic: this.props.proposal.profilepic,
      description: this.props.proposal.description,
      firstname: this.props.proposal.firstname,
      lastname: this.props.proposal.lastname
    };

    if (this.state.addQuestionsTxt || this.state.addQuestionsImage) {
      this.state.addQuestionsTxt.map((question) => { 
        qsAndAs.push({ q: question.question, a: question.answer, type: 'txt' });
      });

      this.state.addQuestionsImage.map((question) => { 
        qsAndAs.push({ q: question.question, a: question.answer, type: 'upload' });
      });
      answersDisplay = <AnswersDisplay qsAndAs={qsAndAs} />;
    }

    return (
      <div className={s.root}>
        <div>
          <Row>
            <Col sm={4} xsOffset={4}>
              <Button onClick={() => this.setState({ open: !this.state.open })}>
                {`${this.props.counter}) Propuesta creada el ${createdAt}`}
              </Button>
              <Panel collapsible expanded={this.state.open}>
                <div className={s.leftAlignedDiv}>
                  <p>{`Categoría: ${catEnglishToSpanish(this.props.proposal.category)}`}</p>
                  <p>{`Dirección: ${this.props.proposal.address}`}</p>
                  <p>{`Número de teléfono: ${this.props.proposal.phone}`}</p>
                  <p>{`Email: ${this.props.proposal.email}`}</p>
                  <p>{`Fecha propuesta: ${propDate}`}</p>
                  <p>{`Estado: ${(this.props.proposal.status === 0) ? 'Fixer aún no ha sido notificado' : 'Fixer ha sido notificado'}`}</p>
                </div>
                <div>
                  <p className={s.proposalTitle}>{`Sobre tu fixer`}</p>
                </div>
                <FixerPanel fixer={fixer} />
                <div className={s.leftAlignedDiv}>
                  {answersDisplay}
                </div>
              </Panel>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ProposalCard);
