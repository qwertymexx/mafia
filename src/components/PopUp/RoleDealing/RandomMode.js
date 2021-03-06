import React, { Component } from 'react';
import { shuffle, concat, fill } from 'lodash';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {
  lightModeOff,
  lightModeOn,
  clearSelectedNumbers,
  addToSelectedNumbers,
  changeGameState,
} from 'redux/actions/gameActions';
import { addRole } from 'redux/actions/playersActions';
import colors from 'colors.js';
import { EyeIcon, ThumbDownIcon, DonRingIcon, ThumbUpIcon, SheriffOkIcon } from 'icons/svgIcons';
import { PopUpButton } from '../styled-components';
const { popupIcon, popupIconLight } = colors.RoleDealing;

const Card = styled.div`
  flex-grow: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const RoleName = styled.h1`
  font-size: 400%;
  color: ${props => (props.light ? colors.RoleDealing.popupTextLight : colors.RoleDealing.popupText)};
`;

const ScaledPopUpButton = styled(PopUpButton)`
  transform: scale(2);
`;

class RandomMode extends Component {
  state = { role: null, cardDisabled: false };
  allRoles = shuffle(concat(fill(Array(6), 'МИРНЫЙ'), 'ШЕРИФ', 'МАФИЯ', 'МАФИЯ', 'ДОН'));

  componentDidMount = () => this.props.addToSelectedNumbers(0);
  componentWillUnmount = () => clearTimeout(this.timeout);
  componentDidUpdate = prevState => {
    // Возвращаемся на пред. страницу при "Новой игре"
    prevState.game.selectedNumbers.length > 0 && this.props.game.selectedNumbers.length === 0 && this.props.resetMode();
  };

  cardClicked = () => {
    const playerNumber = this.props.game.selectedNumbers[0];
    if (this.state.role) {
      this.setState({ role: null, cardDisabled: true });
      this.props.lightModeOff();
      const prevSelectedNumber = playerNumber;
      this.props.clearSelectedNumbers();
      this.props.addToSelectedNumbers(prevSelectedNumber + 1);
      this.timeout = setTimeout(() => {
        this.setState({ cardDisabled: false });
      }, 1000);
      return;
    }

    if (!this.allRoles.length) return;

    const role = this.allRoles.pop();
    this.props.addRole({ playerNumber, role });
    this.setState({ role });
    if (role === 'МИРНЫЙ' || role === 'ШЕРИФ') this.props.lightModeOn();
  };

  startGameClicked = () => {
    this.props.clearSelectedNumbers();
    this.props.changeGameState({ phase: 'ZeroNight' });
  };

  render = () => (
    <Card onClick={!this.state.cardDisabled ? this.cardClicked : undefined}>
      {!this.state.role && !!this.allRoles.length && <EyeIcon size={'40%'} fill={popupIcon} />}
      {!this.state.role && !this.allRoles.length && (
        <ScaledPopUpButton onClick={this.startGameClicked} color="RoleDealing">
          Играть
        </ScaledPopUpButton>
      )}

      {this.state.role &&
        ((this.state.role === 'МАФИЯ' && <ThumbDownIcon size={'30%'} fill={popupIcon} />) ||
          (this.state.role === 'ДОН' && <DonRingIcon size={'30%'} fill={popupIcon} />) ||
          (this.state.role === 'МИРНЫЙ' && <ThumbUpIcon size={'30%'} fill={popupIconLight} />) ||
          (this.state.role === 'ШЕРИФ' && <SheriffOkIcon size={'30%'} fill={popupIconLight} />))}

      {this.state.role && (
        <>
          <RoleName light={this.props.game.lightMode}>{this.state.role}</RoleName>
          <PopUpButton color="RoleDealing" light={this.props.game.lightMode}>
            Закрыть
          </PopUpButton>
        </>
      )}
    </Card>
  );
}

export default connect(
  ({ game }) => ({ game }),
  { lightModeOff, lightModeOn, clearSelectedNumbers, addToSelectedNumbers, addRole, changeGameState }
)(RandomMode);
