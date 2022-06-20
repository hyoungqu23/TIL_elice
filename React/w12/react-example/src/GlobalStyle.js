import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    text-decoration: none;
    list-style: none;
  }

  body {
    font-family: "Helvetica", "Arial", sans-serif;
    line-height: 1.5;
  }
`;

export default GlobalStyle;
