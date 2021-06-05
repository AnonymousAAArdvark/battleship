import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *:before, *:after {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      word-wrap: break-word;
    }
    
    html {
      line-height: 1.6;
      position: relative;
      min-height: 100%;
    }
    
    body {
      font-family: 'Montserrat', sans-serif;
      background-color: ${({ theme }) => theme.colors.background};
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    } 
    
    h1, h2, h3, h4, h5, h6 {
      line-height: 1.2;
    }
    
    a {
      text-decoration: none;
    }
    
    img {
      display: block;
      width: 100%;
    }
    
    button {
      cursor: pointer;
    }
`;

export default GlobalStyle;