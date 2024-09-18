const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Usar las rutas definidas en routes/index.js
app.use('/', indexRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
