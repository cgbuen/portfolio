import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  .light-mode {
    --max-width: 1100px;
    --border-radius: 12px;
    --font-mono: ui-monospace, Menlo, Monaco, 'Cascadia Mono', 'Segoe UI Mono',
      'Roboto Mono', 'Oxygen Mono', 'Ubuntu Monospace', 'Source Code Pro',
      'Fira Mono', 'Droid Sans Mono', 'Courier New', monospace;

    --foreground-rgb: 21, 21, 21;
    --background-start-rgb: 255, 255, 255;
    --background-end-rgb: 255, 255, 255;

    --primary-glow: conic-gradient(
      from 180deg at 50% 50%,
      #16abff33 0deg,
      #0885ff33 55deg,
      #54d6ff33 120deg,
      #0071ff33 160deg,
      transparent 360deg
    );
    --secondary-glow: radial-gradient(
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0)
    );

    --tile-start-rgb: 239, 245, 249;
    --tile-end-rgb: 228, 232, 233;
    --tile-border: conic-gradient(
      #00000080,
      #00000040,
      #00000030,
      #00000020,
      #00000010,
      #00000010,
      #00000080
    );

    --callout-rgb: 238, 240, 241;
    --callout-border-rgb: 172, 175, 176;
    --card-rgb: 180, 185, 188;
    --card-border-rgb: 131, 134, 135;
  }

  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 21, 21, 21;
    --background-end-rgb: 21, 21, 21;

    --primary-glow: radial-gradient(rgba(1, 65, 255, 0.4), rgba(1, 65, 255, 0));
    --secondary-glow: linear-gradient(
      to bottom right,
      rgba(1, 65, 255, 0),
      rgba(1, 65, 255, 0),
      rgba(1, 65, 255, 0.3)
    );

    --tile-start-rgb: 2, 13, 46;
    --tile-end-rgb: 2, 5, 19;
    --tile-border: conic-gradient(
      #ffffff80,
      #ffffff40,
      #ffffff30,
      #ffffff20,
      #ffffff10,
      #ffffff10,
      #ffffff80
    );

    --callout-rgb: 20, 20, 20;
    --callout-border-rgb: 108, 108, 108;
    --card-rgb: 100, 100, 100;
    --card-border-rgb: 200, 200, 200;
  }

  * {
    box-sizing: border-box;
    margin: 0;
  }

  html {
    -webkit-font-smoothing: antialiased;
  }

  html,
  body {
    max-width: 100vw;
  }

  body {
    background: rgb(var(--background-start-rgb));
    color: rgb(var(--foreground-rgb));
  }

  #__next {
    display: block;
  }
  svg {
    fill: transparent;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  p, ul {
    margin-bottom: 15px;
  }

  .yarl__portal {
    z-index: 999999;
  }
  .yarl__container {
    background-color: rgba(0, 0, 0, .85) !important;
  }
  .yarl__slide_description {
    background-color: rgba(17, 17, 17, .85) !important;
    border-radius: 5px;
    display: inline-block !important;
    padding: 10px;
    text-align: center !important;
  }
  .yarl__slide_captions_container {
    background: transparent !important;
    text-align: center;
  }

  .hide {
    display: none;
  }
  .visible {
    visibility: visible;
  }
  .clickable {
    cursor: pointer;
    pointer-events: auto;
  }
`

export default GlobalStyles
