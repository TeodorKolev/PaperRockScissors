import React, { Component } from 'react'
import { Button, Grid, Row, Col } from 'react-bootstrap'
import * as GameSettings from '../utils/gameSettings'
import './EndScreenComponent.css'
import { setCycle} from "../actions/gameActions";
import {connect} from "react-redux";
import {RESTART} from "../utils/constants";

class EndScreenComponent extends Component {

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          {this.props.userScore === GameSettings.VICTORY_SCORE ?
            <Col mdOffset={4} md={4}>
              <div className='game-over-holder'>You won!</div>
            </Col>
            :
            <Col mdOffset={4} md={4}>
              <div className='game-over-holder'>You lost!</div>
            </Col>
          }
          <Row className="show-grid">
            <Col mdOffset={4} md={4}>
              <Button bsSize="large" bsStyle="success" onClick={() => {this.props.setCycle(RESTART, true)}}>
                Play Again
              </Button>
            </Col>
          </Row>
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    userScore: state.userScore
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCycle: (type, value) => { dispatch(setCycle(type, value)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EndScreenComponent)
