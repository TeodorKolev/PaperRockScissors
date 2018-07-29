import React, { Component } from 'react'
import { connect } from 'react-redux'
import {setCycle} from '../actions/gameActions'
import ScoreBoardComponent from './ScoreBoardComponent'
import ActionsComponent from './ActionsComponent'
import StartScreenComponent from './StartScreenComponent'
import EndScreenComponent from './EndScreenComponent'
import * as GameSettings from '../utils/gameSettings'
import {END} from "../utils/constants";
import ActionComputer from "./ActionComputer";
import SetScoreComponent from "./SetScoreComponent";

class GameMainLogicComponent extends Component {

  componentWillReceiveProps(nextProps) {
    if ((nextProps.userScore !== this.props.userScore || nextProps.computerScore !== this.props.computerScore) &&
      (nextProps.userScore === GameSettings.VICTORY_SCORE || nextProps.computerScore === GameSettings.VICTORY_SCORE)) {
      this.props.setCycle(END, true)
    }
  }

  render() {
    return (
      <div>
        {!this.props.gameStartedState ?
          <StartScreenComponent />
          :
          <div>
            <ActionComputer />
            <SetScoreComponent />
            <ScoreBoardComponent />
            {this.props.gameEndedState ?
              <EndScreenComponent/>
              :
              <ActionsComponent />
              }
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    gameStartedState: state.gameStartedState,
    userScore: state.userScore,
    computerScore: state.computerScore,
    gameEndedState: state.gameEndedState
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCycle: (type, value) => { dispatch(setCycle(type, value)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameMainLogicComponent)
