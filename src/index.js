import React from 'react';
import ReactDOM from 'react-dom';
import './base.css';
import theme from './theme'
import { ThemeProvider } from 'theme-ui'
import App from "./Components/index";

const rootElement = document.getElementById("root");

ReactDOM.render( 
  <ThemeProvider theme={theme}>
    <App/>
  </ThemeProvider>, 
  rootElement
  );
