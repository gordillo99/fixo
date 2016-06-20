import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { Button, FormGroup, ControlLabel, FormControl, Jumbotron } from 'react-bootstrap';
import s from './Questionnaire.css';

export default class Questionnaire extends Component {

  _updateAnswers(index, event) {
    let tempQsAndAs = this.props.qsAndAs;
    tempQsAndAs[index].a = event.target.value;
    this.props.updateAnswers(tempQsAndAs);
  }

  _submitFinalAnswers(event) {
    event.preventDefault();
    this.props.submitFinalAnswers(this.props.qsAndAs);
  }

  render() {

    return (
      <div className={classNames(s.formWrapper)}>
        <form>
          {this.props.qsAndAs.map((qAndA, index) => {
            let prompt;
            switch(qAndA.type) {
              case 'select':
                prompt =  <FormControl key={'qPromptSel-' + index} value={this.props.qsAndAs.a} componentClass='select' onChange={this._updateAnswers.bind(this, index)}>
                            {qAndA.opts.map((opt, i) => { return <option key={'selOpt-' + i} value={opt}>{opt}</option> })}                      
                          </FormControl>
                break;
              case 'textarea':
                prompt = <FormControl key={'qPromptTa-' + index} value={this.props.qsAndAs.a} componentClass='textarea' onChange={this._updateAnswers.bind(this, index)} />
                break;
              case 'input':
                prompt =  <FormControl
                            key={'qPromptIn-' + index}
                            type='text'
                            onChange={this._updateAnswers.bind(this, index)}
                            className={classNames(s.qAnswers)}
                            value={this.props.qsAndAs.a}
                          />
                break;
              default:
                prompt = null;
                break;
            } 
            return (
              <div>
                <FormGroup controlId='addQsControl' key={'qFormGroup-' + index}>
                  <ControlLabel className={classNames(s.questionLabel)} key={'qControlLabel-' + index}>
                    {qAndA.q}
                  </ControlLabel>
                  {prompt}
                </FormGroup>
              </div>
            )
          })}
          <div className={classNames(s.centralizedDiv)}>
            <Button bsStyle='primary' onClick={this._submitFinalAnswers.bind(this)} className={classNames(s.acceptBtn)} type="submit">
              Aceptar
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(s)(Questionnaire);