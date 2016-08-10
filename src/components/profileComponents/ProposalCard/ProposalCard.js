import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { Col, Row, Button, Panel, Glyphicon } from 'react-bootstrap';
import { catEnglishToSpanish } from '../../../helpers/helpers.js';
import AnswersDisplay from '../../questionComponents/AnswersDisplay';
import FixerPanel from '../../FixerPanel';
import ReviewForm from '../ReviewForm';
import ReviewDisplay from '../ReviewDisplay';
import s from './ProposalCard.css';
import $ from 'jquery';

export default class ProposalCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      review: {
        rating: 0,
        comment: ''
      },
      hasReview: this.props.proposal.has_review === 'yes',
      addQuestionsTxt: null,
      addQuestionsImage: null,
      showProposalContent: true,
      open: false
    };
  }

  componentDidMount() {
    $.ajax({
      url: `/api/proposals/get/additional_info/${this.props.proposal.proposal_id}`,
      type: 'GET',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({ 
          addQuestionsTxt: data.addQuestionsTxt,
          addQuestionsImage: data.addQuestionsImage
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
      }.bind(this)
    });

    if (this.state.hasReview) {
      $.ajax({
        url: `/api/reviews/crud/${this.props.proposal.proposal_id}`,
        type: 'GET',
        dataType: 'json',
        cache: false,
        success: function(data) {
          this.setState({
            review: data[0]
          });
        }.bind(this),
        error: function(xhr, status, err) {
          console.log(err);
        }.bind(this)
      });
    }
  }

  _updateHasReviewProp(value, review) {
    this.setState({ hasReview: value, review: review });
  }

  _showProposalDetailsBtn() {
    if (this.state.open) {
      if (this.state.showProposalContent) {
        this.setState({ open: !this.state.open });
      } else {
        this.setState({ showProposalContent: true }, );
      }
    } else {
      this.setState({ open: !this.state.open, showProposalContent: true });
    }
  }

  _showReviewFormBtn() {
    if (this.state.open) {
      if (!this.state.showProposalContent) {
        this.setState({ open: !this.state.open });
      } else {
        this.setState({ showProposalContent: false }, );
      }
    } else {
      this.setState({ open: !this.state.open, showProposalContent: false });
    }
  }

  render() {
    let dateFormat = require('dateformat');
    let answersDisplay = null;
    let qsAndAs = [];
    let reviewContent = null;
    let createdAt = dateFormat(this.props.proposal.created_at, 'dd/mm/yyyy').toString();
    let propDate = `${dateFormat(this.props.proposal.prop_date, 'dd/mm/yyyy').toString()} en la ${(this.props.proposal.morning === 1) ? 'mañana' : 'tarde'}`;
    let panelContent = null;
    let reviewBtnText = '';
    let fixer = {
      profilepic: this.props.proposal.profilepic,
      description: this.props.proposal.description,
      firstname: this.props.proposal.firstname,
      lastname: this.props.proposal.lastname,
      avg_rating: this.props.proposal.avg_rating,
      num_ratings: this.props.proposal.num_ratings
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

    if (this.state.hasReview) {
      reviewContent = <ReviewDisplay
                        review={this.state.review}
                        fixerFirstName={fixer.firstname}
                        fixerLastName={fixer.lastname}
                      />;
    } else {
      reviewContent = <ReviewForm 
        user_id={this.props.proposal.user_id}
        fixer_id={this.props.proposal.fixer_id}
        proposal_id={this.props.proposal.proposal_id}
        updateHasReview={this._updateHasReviewProp.bind(this)}
        fixerFirstName={fixer.firstname}
        fixerLastName={fixer.lastname}
      />;
    }

    /*

    <div className={s.leftAlignedDiv}>
      <p>{`Categoría: ${catEnglishToSpanish(this.props.proposal.category)}`}</p>
      <p>{`Dirección: ${this.props.proposal.address}`}</p>
      <p>{`Número de teléfono: ${this.props.proposal.phone}`}</p>
      <p>{`Email: ${this.props.proposal.email}`}</p>
      <p>{`Fecha propuesta: ${propDate}`}</p>
      <p>{`Estado: ${(this.props.proposal.status === 0) ? 'Fixer aún no ha sido notificado' : 'Fixer ha sido notificado'}`}</p>
    </div>

    */

    if (this.state.showProposalContent) {
       panelContent = <div>
                        <div className={s.leftAlignedDiv}>
                          <p>{`Categoría: ${catEnglishToSpanish(this.props.proposal.category)}`}</p>
                          <p>{`Estado: ${(this.props.proposal.status === 0) ? 'Fixer aún no ha sido notificado' : 'Fixer ha sido notificado'}`}</p>
                        </div>
                        <div>
                          <p className={s.proposalTitle}>{`Sobre tu fixer`}</p>
                          <FixerPanel showReviews={false} fixer={fixer} />
                        </div>
                        <div className={s.leftAlignedDiv}>
                          {answersDisplay}
                        </div>
                      </div>
    } else {
      panelContent = reviewContent;
    }

    if (this.state.open && !this.state.showProposalContent) {
      reviewBtnText = 'Ocultar tu reseña';
    } else if (this.state.hasReview) {
      reviewBtnText = 'Mostrar tu reseña';
    } else {
      reviewBtnText = 'Escribir una reseña'; 
    }

    return (
      <div className={s.root}>
        <div>
          <Row className={s.row}>
            <Col md={12} xs={12} className={s.centerBlock}>
              <div className={s.leftAlignedDiv}>
                <ul className={s.noListStyle}>
                  <li className={s.inlineEles}>
                    <h4>{`Propuesta del ${createdAt}`}</h4>
                  </li>
                  <li className={s.inlineEles, s.centralizedDiv}>
                    <Button 
                      bsStyle='primary'
                      onClick={this._showProposalDetailsBtn.bind(this)}
                      className={s.detailsButton}
                    >
                      {(this.state.open && this.state.showProposalContent) ? 'Ocultar detalles' : 'Mostrar detalles'}
                    </Button>
                    <Button 
                      bsStyle='info'
                      onClick={this._showReviewFormBtn.bind(this)} 
                      //hidden={this.state.hasReview}
                      className={s.detailsButton}
                    >
                      {reviewBtnText}
                    </Button>
                  </li>
                </ul>
              </div>
              <Panel collapsible expanded={this.state.open}>
                <div>
                  {panelContent}
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
