import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { Button, FormGroup, ControlLabel, FormControl, Jumbotron } from 'react-bootstrap';
import s from './AdditionalQuestions.css';

export default class AdditionalQuestions extends Component {

  constructor() {
    super();
    this.state = {
      questions: [],
      answers: [],
      gardeningQs: {
                      o0: {q0: 'Pregunta 1', a0: ''},
                      o1: {q1: 'Pregunta 1', a1: ''},
                      o2: {q2: 'Pregunta 1', a2: ''},
                      o3: {q3: 'Pregunta 1', a3: ''}
                    }, 
      carpentryQs: {
                      o0: {q0: 'Pregunta 1', a0: ''},
                      o1: {q1: 'Pregunta 1', a1: ''},
                      o2: {q2: 'Pregunta 1', a2: ''},
                      o3: {q3: 'Pregunta 1', a3: ''}
                    },
      paintingQs: {
                    o0: {q0: 'Pregunta 1', a0: ''},
                    o1: {q1: 'Pregunta 1', a1: ''},
                    o2: {q2: 'Pregunta 1', a2: ''},
                    o3: {q3: 'Pregunta 1', a3: ''}
                  },
      electricityQs: {
                        o0: {q0: 'Pregunta 1', a0: ''},
                        o1: {q1: 'Pregunta 1', a1: ''},
                        o2: {q2: 'Pregunta 1', a2: ''},
                        o3: {q3: 'Pregunta 1', a3: ''}
                      }, 
      plumbingQs: {
                      o0: {q0: 'Pregunta 1', a0: ''},
                      o1: {q1: 'Pregunta 1', a1: ''},
                      o2: {q2: 'Pregunta 1', a2: ''},
                      o3: {q3: 'Pregunta 1', a3: ''}
                  }
    };
  }

  _handleAnswers(index, event) {
    let stateProp = this.props.category + 'Qs';
    let copyOfState = this.state[stateProp];

    copyOfState['o' + index]['a' + index] = event.target.value;
    this.setState( { [stateProp]: copyOfState } );
  }

  _updateAnswers(answers, event) {
    event.preventDefault();
    this.props.saveAnswers(answers);
  }

  render() {
    let qsAndAs = this.state[this.props.category + 'Qs'];
    let qArray = [];
    let counter = 0;

    for(var propertyName in qsAndAs) {
      qArray.push(qsAndAs[propertyName]['q' + counter.toString()]);
      counter++;
    }

    return (
      <div className={classNames(s.formWrapper)}>
        <form>
          <FormGroup
            controlId='addQsControl'
          >
            <div>
              {qArray.map((qAndA, index) => {
                  return (
                    <div key={'cLabel-' + index}>
                      <ControlLabel className={classNames(s.questionLabel)}>
                        {qAndA}
                      </ControlLabel>
                      <FormControl
                        type='text'
                        onChange={this._handleAnswers.bind(this, index)}
                        className={classNames(s.qAnswers)}
                      />
                    </div>
                  )
                }
              )}
            </div>
          </FormGroup>
          <div className={classNames(s.centralizedDiv)}>
            <Button onClick={this._updateAnswers.bind(this, this.state[this.props.category + 'Qs'])} className={classNames(s.acceptBtn)} type="submit">
              Aceptar
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(s)(AdditionalQuestions);