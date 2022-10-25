import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    color: var(--color-on-surface);
  }

  input:-webkit-autofill{
    -webkit-text-fill-color: none !important;
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
      transition: background-color 5000s ease-in-out 0s;
  }
  
  #root {
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }

  .shadow {
    box-shadow: 0px 0px 5px rgba(23, 24, 24, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0px 0px 5px rgba(23, 24, 24, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.15);
    -webkit-box-shadow: 0px 0px 5px rgba(23, 24, 24, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.15);
  }

  .border-radius-1 {
    border-radius: 0.8rem;
    -moz-border-radius: 0.8rem;
    -webkit-border-radius: 0.8rem;
  }

  .border-radius-half {
    border-radius:0.45rem;
    -moz-border-radius:0.45rem;
    -webkit-border-radius:0.45rem;
  }

  .border-radius-quarter {
    border-radius: 0.22rem;
    -moz-border-radius: 0.22rem;
    -webkit-border-radius: 0.22rem;
  }

  .ignore-bottom-radius {
    border-bottom-left-radius: 0;
    -moz-border-bottom-left-radius: 0;
    -webkit-border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    -moz-border-bottom-right-radius: 0;
    -webkit-border-bottom-right-radius: 0;
  }

  .trim-vertical-margins > :first-child {
    margin-top:0rem !important;
  }

  .trim-vertical-margins > :last-child {
    margin-bottom:0rem !important;
  }


  .shake {
    transform-origin: center center;
    animation: shake-base 0.5s ease-in-out;
    animation-iteration-count: infinite;
  }


  @keyframes shake-base {
    0% {
        transform: translate(1px, 1px) rotate(0deg);
    }

    10% {
        transform: translate(-1px, -2px) rotate(-1deg);
    }

    20% {
        transform: translate(-3px, 0px) rotate(1deg);
    }

    30% {
        transform: translate(3px, 2px) rotate(0deg);
    }

    40% {
        transform: translate(1px, -1px) rotate(1deg);
    }

    50% {
        transform: translate(-1px, 2px) rotate(-1deg);
    }

    60% {
        transform: translate(-3px, 1px) rotate(0deg);
    }

    70% {
        transform: translate(3px, 1px) rotate(-1deg);
    }

    80% {
        transform: translate(-1px, -1px) rotate(1deg);
    }

    90% {
        transform: translate(1px, 2px) rotate(0deg);
    }

    100% {
        transform: translate(1px, -2px) rotate(-1deg);
    }
  }

  .fa-spin {
    animation: fa-spin 2s infinite linear;
  }
  
  @keyframes fa-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }


  .anim-enter {
    opacity: 0;
    transform: scale(0.9);
  }

  .anim-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 300ms, transform 300ms;
  }

  .anim-exit {
    opacity: 1;
  }

  .anim-exit-active {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 300ms, transform 300ms;
  }


  .anim-height-enter, .anim-height-exit {
    transition: all 350ms ease-out;
    overflow: hidden;
  }

  .anim-height-enter, .anim-height-exit.anim-height-exit-active {
      opacity: 0;
      transform: scale(0.5, 0);
      transform-origin: top left;
  }

  .anim-height-exit, .anim-height-enter.anim-height-enter-active {
      opacity: 1;
      transform: scale(1, 1);
      transform-origin: top center;
  }
`;
