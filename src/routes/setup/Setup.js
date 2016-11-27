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
      dates: [],
      times: [],
      mins: [],
      ampm:[],
      morning: true,
      qsAndAs: {},
      selectedFixer: {},
      area: 1,
      areas: []
    };
  }

  _handleAnswers(answAndQs) {
    this.setState({  
      setupStage: ++this.state.setupStage,
      qsAndAs: answAndQs
    });
    window.scrollTo(0,0);
  }

  _isSameDate(date1, date2) {
    return date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() && 
      date1.getFullYear() === date2.getFullYear();
  }

  _updateDateArray(propName, index, event) {
    let array = this.state[propName];
    array[index] = event.target.value;
    this.setState({ [propName]: array });
  }

  _handleDayChange(date) {
    let datesArray = this.state.dates;
    let timesArray = this.state.times;
    let ampmArray = this.state.ampm;
    let minsArray = this.state.mins;
    let index;
    let dateWasFound = false;

    for (index =  0; index < datesArray.length; index++) {
      if (this._isSameDate(datesArray[index], date)) {
        dateWasFound = true;
        break;
      }
    }

    if (dateWasFound) {
      datesArray.splice(index, 1);
      ampmArray.splice(index, 1);
      minsArray.splice(index, 1);
      timesArray.splice(index, 1);

    } else {
      if (datesArray.length < 3) {
        datesArray.push(date);
        timesArray.push('1');
        minsArray.push('00');
        ampmArray.push('PM');
      }
    }

    this.setState( { 
      dates: datesArray,
      times: timesArray,
      ampm: ampmArray
    });
  }

  _handleFixerChange(fixer) {
    this.setState( { selectedFixer: fixer } );
  }

  _updatesProperty(property, e) {
    this.setState({ [property]: e.target.value });
  }

  _handleTimeChange(e) {
    this.setState({ morning: !this.state.morning });
  }

  _nextStage(e) {
    if (e !== undefined) e.preventDefault();
    this.setState({ setupStage: ++this.state.setupStage });
    window.scrollTo(0,0);
  }

  componentDidMount() {
    $.ajax({
      url: '/api/areas/crud',
      type: 'GET',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({ areas: data });
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
        content = <FixerFinder 
                    category={this.props.category}
                    area={this.state.area}
                    toNextStage={this._nextStage.bind(this)}
                    changeFixer={this._handleFixerChange.bind(this)}
                    areas={this.state.areas}
                    updateArea={this._updatesProperty.bind(this)}
                    area={this.state.area}
                  />
        
        break;
      case 2:
        content = <SetupForm
                    selection={this.state}
                    updateDateArray={this._updateDateArray.bind(this)}
                    isSameDate={this._isSameDate}
                    updateDay={this._handleDayChange.bind(this)}
                    updateAddress={this._updatesProperty.bind(this)}
                    updateEmail={this._updatesProperty.bind(this)}
                    updateTime={this._handleTimeChange.bind(this)}
                    updatePhone={this._updatesProperty.bind(this)}
                    morning={this.state.morning}
                    dates={this.state.dates}
                    times={this.state.times}
                    mins={this.state.mins}
                    ampm={this.state.ampm}
                    email={this.state.email}
                    address={this.state.address}
                    area={this.state.area}
                    phone={this.state.phone}
                    toNextStage={this._nextStage.bind(this)}
                    areas={this.state.areas}
                    fixer={this.state.selectedFixer}
                    category={this.props.category}
                  />
        break;
      /*case 3:
        content = <ProposalConfirmation
                    category={this.props.category}
                    toNextStage={this._nextStage.bind(this)}
                    selection={this.state}
                  />;
        break;
      case 4:
        content = <ThankYouDisplay />;
        progression = null;
        break;*/
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