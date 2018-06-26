const express = require('express');
const path = require('path');
const morgan = require('morgan');
const compression = require('compression');

const app = express();

app.use(compression());
app.use(express.static(path.join(process.cwd(), 'dist')));
app.use(morgan('tiny'));

/* serves main page */
app.get('*', function (req, res) {
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

const port = process.env.PORT || 80;

app.listen(port, function () {
  console.log('Listening on ' + port);
});
