import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Jumbotron } from 'react-bootstrap';
import ProgressionStatus from './../../components/ProgressionStatus';
import SetupForm from './../../components/SetupForm';
import AdditionalQuestions from './../../components/AdditionalQuestions';
import FixerFinder from './../../components/FixerFinder';
import ProposalConfirmation from './../../components/ProposalConfirmation';
import ThankYouDisplay from './../../components/ThankYouDisplay';
import $ from 'jquery';
import s from './Setup.css';

export default class Setup extends Component {

  constructor(){
    super();
    this.state = {
      setupStage: 0,
      address: '',
      phone: '',
      email: '',
      date: new Date(),
      morning: true,
      qsAndAs: {},
      selectedFixer: {},
      area: '1',
      areas: []
    };
  }

  _handleAnswers(answAndQs) {
    this.setState({  
      setupStage: ++this.state.setupStage,
      qsAndAs: answAndQs
    });
  }

  _handleDayChange(date) {
    this.setState( { date: date } );
  }

  _handleFixerChange(fixer) {
    this.setState( { selectedFixer: fixer } );
  }

  _updateProperty(property, e) {
    this.setState({ [property]: e.target.value });
  }

  _handleTimeChange(e) {
    this.setState({ morning: !this.state.morning });
  }

  _nextStage(e) {
    if (e !== undefined) e.preventDefault();
    this.setState({ setupStage: ++this.state.setupStage });
  }

  componentDidMount() {
    $.ajax({
      url: '/api/areas/crud',
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
  }

  render() {
    let content = null;
    let progression = <ProgressionStatus currentStage={this.state.setupStage}/>;

    switch(this.state.setupStage) {
      case 0:
        content = <AdditionalQuestions
                    category={this.props.category}
                    saveAnswers={this._handleAnswers.bind(this)}
                  />
        break;
      case 1:
        content = <SetupForm
                    updateDay={this._handleDayChange.bind(this)}
                    updateAddress={this._updateProperty.bind(this)}
                    updateEmail={this._updateProperty.bind(this)}
                    updateTime={this._handleTimeChange.bind(this)}
                    updatePhone={this._updateProperty.bind(this)}
                    updateArea={this._updateProperty.bind(this)}
                    morning={this.state.morning}
                    date={this.state.date}
                    email={this.state.email}
                    address={this.state.address}
                    area={this.state.area}
                    phone={this.state.phone}
                    toNextStage={this._nextStage.bind(this)}
                    areas={this.state.areas}
                  />
        break;
      case 2:
        content = <FixerFinder 
                    category={this.props.category}
                    area={this.state.area}
                    toNextStage={this._nextStage.bind(this)}
                    changeFixer={this._handleFixerChange.bind(this)}
                  />
        break;
      case 3:
        content = <ProposalConfirmation
                    category={this.props.category}
                    toNextStage={this._nextStage.bind(this)}
                    selection={this.state}
                  />;
        break;
      case 4:
        content = <ThankYouDisplay />;
        progression = null;
        break;
      default:
        content = null; 
        break;
    }

    return (
      <div className={s.root}>
        <div className={s.centralizedDiv}>
          <Jumbotron className={s.stripeJumbotron}>
            <h1 className={s.pageHeader}>{this.props.categoria}</h1>
            {progression}
          </Jumbotron>
          {content}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Setup);