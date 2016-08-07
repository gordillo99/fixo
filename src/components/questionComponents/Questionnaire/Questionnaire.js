import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { Button, FormGroup, ControlLabel, FormControl, Jumbotron, HelpBlock, Row, Col } from 'react-bootstrap';
import $ from 'jquery';
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

  _updateAttachedImage(index, event) {
    let tempQsAndAs = this.props.qsAndAs;
    tempQsAndAs[index].a = $(event.target)[0].files[0];
    // if the image size is bigger than 2 MB, return
    if (tempQsAndAs[index].a.size > 200000) {
      alert('Este archivo no sera subido. El límite es 2 MB.');
      return;
    }
    this.props.updateAnswers(tempQsAndAs);
  }

  render() {

    return (
      <div className={s.root}>
        <div className={s.container}>
          <div >
            <Row className={s.row}>
              <Col md={4} xs={10} className={s.centerBlock}>
                <div className={s.leftAlignedDiv}>
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
                        case 'upload':
                          prompt =  <div>
                                      <FormControl key={'qFileUpload-' + index} type="file" onChange={this._updateAttachedImage.bind(this, index)} />
                                      <HelpBlock key={'helpblock-' + index}>Tamaño máximo es 2 MB</HelpBlock>
                                    </div>
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
                    <div className={classNames(s.centeringDiv)}>
                      <Button bsStyle='primary' onClick={this._submitFinalAnswers.bind(this)} className={classNames(s.acceptBtn)} type="submit">
                        Aceptar
                      </Button>
                    </div>
                  </form>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Questionnaire);