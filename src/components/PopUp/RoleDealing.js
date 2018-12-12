import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { lightModeOn } from '../../redux/actions/gameActions';
import colors from '../../colors';
import PopUpButton from './style/PopUpButton';
import {
  EyeIcon,
  DonRingIcon,
  SherifOkIcon,
  ThumbUpIcon,
  ThumbDownIcon,
  RandomCubeIcon,
  ListIcon,
} from '../../img/svgIcons';

const SvgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 40%;
  flex-grow: 3;

  div:not(:last-child) {
    border-bottom: 2px solid ${colors.RoleDealing.dealingMode};
  }

  path {
    fill: ${props => (props.selected ? colors.RoleDealing.dealingModeSelected : colors.RoleDealing.dealingMode)};
    transition: fill 0.3s;
  }
  div:hover path,
  .selected path {
    fill: ${colors.RoleDealing.dealingModeSelected};
  }
`;

class RoleDealing extends Component {
  state = { randomModeSelected: true, manualModeSelected: false };

  buttonClicked = () => this.props.lightModeOn();

  render = () => {
    const lightMode = this.props.game.lightMode;
    return (
      <Fragment>
        <SvgWrapper>
          <div
            className="flex-grow-1 d-flex align-items-center justify-content-center"
            onClick={() => this.setState({ randomModeSelected: true, manualModeSelected: false })}
          >
            <RandomCubeIcon className={this.state.randomModeSelected ? 'selected' : null} size={'100px'} />
          </div>
          <div
            className="flex-grow-1 d-flex align-items-center justify-content-center"
            onClick={() => this.setState({ manualModeSelected: true, randomModeSelected: false })}
          >
            <ListIcon className={this.state.manualModeSelected ? 'selected' : null} size={'100px'} />
          </div>
        </SvgWrapper>
        <div className="flex-grow-1 d-flex align-items-center">
          <PopUpButton color={this.props.game.gameState.phase} light={lightMode} onClick={this.buttonClicked}>
            {this.state.randomModeSelected ? 'автоматически' : 'вручную'}
          </PopUpButton>
        </div>
      </Fragment>
    );
  };
}

const mapStateToProps = state => ({ game: state.game });
export default connect(mapStateToProps)(RoleDealing);
