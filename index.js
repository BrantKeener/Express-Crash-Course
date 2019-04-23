const express = require('express');
const path = require('path')
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members');
const PORT = process.env.PORT || 5000;

const app = express();

// init middleware
// app.use(logger);

// Handlebars Middleware
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

// Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage route
app.get('/', (req, res) => res.render('index', {
  title: 'Member App',
  members
}));

// Set a static folder
app.use(express.static(path.join(__dirname, 'public')));

// Members api routes
app.use('/api/members', require('./routes/api/members'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));  