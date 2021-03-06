import styled from 'styled-components';
import colors from 'colors.js';

export const PopUpButton = styled.button`
  background: ${props => (props.light ? colors[props.color].popupButtonLight : colors[props.color].popupButton)};
  padding: 10px 25px;
  border: none;
  color: white;
  border-radius: 30px;
  font-size: 1.1rem;
  text-transform: uppercase;
  transition: filter 0.2s !important;

  ${props =>
    props.disabled
      ? `
  filter: brightness(60%);
  cursor: default;
  `
      : `
  cursor: pointer;
  &:hover {
    filter: brightness(110%);
  }
  
  `}

  &:focus {
    outline: none;
  }
`;
