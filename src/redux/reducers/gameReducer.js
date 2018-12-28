/* eslint-disable */

import _ from 'lodash';
import produce from 'immer';

export default (
  state = {
    opensTable: 0,
    activePlayer: 0,
    gameState: { phase: 'RoleDealing', dayNumber: 2 },
    // SeatAllocator, RoleDealing, ZeroNight, Day, Night, Voting, EndOfGame
    lightMode: false,
    selectedNumbers: [],
    numbersPanelClickable: false,
    popupOpened: true,
  },
  action
) =>
  produce(state, draft => {
    switch (action.type) {
      case 'OPENS_TABLE':
        draft.opensTable = action.playerNumber;
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

      case 'REMOVE_LAST_SELECTED_NUMBER':
        draft.selectedNumbers.pop();
        return;

      case 'CLEAR_SELECTED_NUMBERS':
        draft.selectedNumbers = [];
        return;

      case 'NUMBERS_PANEL_NOT_CLICKABLE':
        draft.numbersPanelClickable = false;
        return;

      case 'NUMBERS_PANEL_CLICKABLE':
        draft.numbersPanelClickable = true;
        return;

      case 'CLOSE_POPUP':
        draft.popupOpened = false;
        return;

      case 'OPEN_POPUP':
        draft.popupOpened = true;
        return;
    }
  });
