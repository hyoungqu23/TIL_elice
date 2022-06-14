import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-size: 24px;
        height: 500vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export default GlobalStyle;
