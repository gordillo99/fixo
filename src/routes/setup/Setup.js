import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { Jumbotron } from 'react-bootstrap';
import ProgressionStatus from './../../components/ProgressionStatus';
import SetupForm from './../../components/SetupForm';
import AdditionalQuestions from './../../components/AdditionalQuestions';
import FixerFinder from './../../components/FixerFinder';
import ProposalConfirmation from './../../components/ProposalConfirmation';
import s from './Setup.css';

export default class Setup extends Component {

  constructor(){
    super();
    this.state = {
      setupStage: 0,
      address: '',
      details: '',
      date: new Date(),
      morning: true,
      qsAndAs: {},
      selectedFixer: {}
    };
  }

  _handleAnswers(answAndQs) {
    console.log(answAndQs);
    this.setState( {  
                      setupStage: ++this.state.setupStage,
                      qsAndAs: answAndQs
                   } );
  }

  _handleDayChange(date) {
    this.setState( { date: date } );
  }

  _handleFixerChange(fixer) {
    this.setState( { selectedFixer: fixer } );
  }

  _handleAddressChange(e) {
    this.setState({ address: e.target.value});
  }

  _handleDetailsChange(e) {
    this.setState({ details: e.target.value});
  }

  _handleTimeChange(e) {
    this.setState({ morning: !this.state.morning });
  }

  _nextStage(e) {
    if (e !== undefined) e.preventDefault();
    this.setState({ setupStage: ++this.state.setupStage });
  }

  render() {
    let content = null;

    switch(this.state.setupStage) {
      case 0:
        content = <SetupForm
                    updateDay={this._handleDayChange.bind(this)}
                    updateAddress={this._handleAddressChange.bind(this)}
                    updateDetails={this._handleDetailsChange.bind(this)}
                    updateTime={this._handleTimeChange.bind(this)}
                    morning={this.state.morning}
                    date={this.state.date}
                    details={this.state.details}
                    address={this.state.address}
                    toNextStage={this._nextStage.bind(this)}
                  />
        break;
      case 1:
        content = <AdditionalQuestions
                    category={this.props.category}
                    saveAnswers={this._handleAnswers.bind(this)}
                  />
        break;
      case 2:
        content = <FixerFinder toNextStage={this._nextStage.bind(this)} changeFixer={this._handleFixerChange.bind(this)} />
        break;
      case 3:
        content = <ProposalConfirmation selection={this.state} />;
        break;
      default:
        content = null; 
        break;
    }

    return (
      <div className={s.root}>
        <div className={s.centralizedDiv}>
          <Jumbotron className={s.stripeJumbotron}>
            <h1>{this.props.categoria}</h1>
            <ProgressionStatus currentStage={this.state.setupStage}/>
          </Jumbotron>
          {content}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Setup);