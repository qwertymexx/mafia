/* eslint-disable */

import produce from 'immer';

export default (
  state = {
    thisRoundFirstPlayer: 0,
    activePlayer: 0,
    gameState: { phase: 'RoleDealing', dayNumber: 0 }, // startScreen, SeatAllocator, RoleDealing, day, night, voting, carCrash, endOfGame
    lightMode: false,
    selectedNumbers: [],
  },
  action
) =>
  produce(state, draft => {
    switch (action.type) {
      case 'THIS_ROUND_FIRST_PLAYER':
        draft.thisRoundFirstPlayer = action.playerNumber;
        return;

      case 'CHANGE_ACTIVE_PLAYER':
        draft.activePlayer = action.playerNumber;
        return;

      case 'CHANGE_GAME_STATE':
        draft.gameState = {
          phase: action.payload.phase,
          dayNumber: action.payload.dayNumber || state.gameState.dayNumber,
        };
        return;

      case 'LIGHT_MODE_ON':
        draft.lightMode = true;
        return;

      case 'LIGHT_MODE_OFF':
        draft.lightMode = false;
        return;

      case 'ADD_TO_SELECTED_NUMBERS':
        draft.selectedNumbers.push(action.playerNumber);
        return;

      case 'CLEAR_SELECTED_NUMBERS':
        draft.selectedNumbers = [];
        return;
    }
  });
