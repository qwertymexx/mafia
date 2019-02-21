export const changeActivePlayer = playerNumber => ({ type: 'CHANGE_ACTIVE_PLAYER', playerNumber });
export const changeGameState = payload => ({ type: 'CHANGE_GAME_STATE', payload });
export const addToSelectedNumbers = playerNumber => ({ type: 'ADD_TO_SELECTED_NUMBERS', playerNumber });
export const removeLastSelectedNumber = () => ({ type: 'REMOVE_LAST_SELECTED_NUMBER' });
export const clearSelectedNumbers = () => ({ type: 'CLEAR_SELECTED_NUMBERS' });
export const lightModeOn = () => ({ type: 'LIGHT_MODE_ON' });
export const lightModeOff = () => ({ type: 'LIGHT_MODE_OFF' });
export const numbersPanelNotClickable = () => ({ type: 'NUMBERS_PANEL_NOT_CLICKABLE' });
export const numbersPanelClickable = () => ({ type: 'NUMBERS_PANEL_CLICKABLE' });
export const closePopup = () => ({ type: 'CLOSE_POPUP' });
export const openPopup = () => ({ type: 'OPEN_POPUP' });
export const minimizeMaximaizePopup = () => ({ type: 'MINIMIZE_MAXIMAIZE_POPUP' });
export const skipVotingInc = () => ({ type: 'SKIP_VOTING_INC' });
export const skipVotingDec = () => ({ type: 'SKIP_VOTING_DEC' });
export const resetGameReducer = () => ({ type: 'RESET_GAME_REDUCER' });
