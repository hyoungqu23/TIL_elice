const express = require('express');
const ReactDOMServer = require('react-dom/server');
const React = require('react');
const App = require('./client/App').default;

const app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {
  const html = ReactDOMServer.renderToString(<App />);

  const template = `
    <html>
      <head>
        <title>SSR React</title>
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
      <script src='bundle.js'></script>
    </html>
  `;

  res.send(template);
});

app.listen(4000, (req, res) => {
  console.log('port number 4000 is running...');
});
