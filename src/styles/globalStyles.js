import { reset } from "styled-reset";
import theme from "./theme";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* RESET CSS */
  ${reset}



  /* BASE Reset */
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
    overflow-x: hidden;
  }
  /* End BASE Reset */




  /* Scrollbar Reset */
  ::-webkit-scrollbar {
    width: 11px;
  }
  ::-webkit-scrollbar-track {
    background: #f7f7f7;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.textLightest};
    border-radius: 6px;
    border: 3px solid #f7f7f7;
  }
  /* End Scrollbar Reset */



  /* Global styles */
  body {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 1.5;
    color: ${theme.colors.text};
    scrollbar-width: thin;
    scrollbar-color: ${theme.colors.textLightest} #f7f7f7;
    background: linear-gradient(135deg, ${theme.colors.highlight} 30%, ${theme.colors.highlight2} 90%);
    min-height:100vh;
  }

  input {
    border: none;
    font: inherit;
  }

  a {
    display: inline-block;
    text-decoration: none;
    font: inherit;
    font-size: 1.4rem;
    font-weight: 500;
  }

  button {
    display: inline-block;
    border: none;
    font: inherit;
    cursor: pointer;
    background-color: transparent;
  }

  img {
    display: block;
    max-width: 100%;
  }

  h1 {
    font-size: 6rem;
  }

  h2 {
    font-weight: bold;
    font-size: 3rem;
    line-height: 1.2;
  }

  h5 {
    font-weight: bold;
		font-size: 1.5rem;
		line-height: 1.2;
    color: ${theme.colors.textLight};
		margin-bottom: 0.5rem;
  }

  h4 {
    font-size: 2.5rem;
    line-height: 1.7;
  }

  p {
    font-size: 1.2rem;
    line-height: 1.25;
  }

  strong {
    font-weight: 500;
  }

  button {
    transition: ${theme.transitions.normal};
    &:hover {
      transform: scale(1.05)
    }
    &:active{
      transform: scale(0.95)
    }
  }

  a, button, input, textarea {
    &:focus, &:active {
      outline: 1px solid ${theme.colors.background};
    }
  }
  /* End Global styles */




  /* REACT TOSTIFY STYLE OVERWRITE */
  .Toastify__toast{
    padding: 2rem;
    box-shadow: ${theme.shadow.medium};
  }
  .Toastify__toast-body {
    padding: 0;
  }
  .Toastify__toast--default {
    color: ${theme.colors.textLight};
  }
  .Toastify__progress-bar--default {
    background: ${theme.colors.BDMOrange};
    background: linear-gradient(90deg, ${theme.colors.highlight} 5%, ${theme.colors.highlight2} 95%);
  }
  .Toastify__bounce-enter--top-right, .Toastify__bounce-enter--bottom-right {
    animation-name: Toastify__bounceInRight--modified;
  }
  .Toastify__bounce-exit--top-right, .Toastify__bounce-exit--bottom-right {
    animation-name: Toastify__bounceOutRight--modified;
  }
  @keyframes Toastify__bounceInRight--modified {
  from, 60%, 75%, 90%, to {
    animation-timing-function: ease-out;
  }
  from {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(-6px, 0, 0);
  }
  75% {
    transform: translate3d(3px, 0, 0);
  }
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes Toastify__bounceOutRight--modified {
  20% {
    opacity: 1;
    transform: translate3d(-6px, 0, 0);
  }
  to {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
}
`;

export default GlobalStyles;
