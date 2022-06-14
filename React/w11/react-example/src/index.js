import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import RegisterForm from './ResisterForm';
import MathProblem from './MathProblem';
import reportWebVitals from './reportWebVitals';
import Register from './Register';
import Calculator from './Calculator';
import GlobalStyle from './GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
    <RegisterForm />
    <MathProblem />
    <Register />
    <Calculator />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
