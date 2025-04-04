const express = require('express');
const router = require('./routes/index.routes.js');
const morganMiddleware = require('./middlewares/morgan.js');
const path = require('path'); 
const expressLayouts = require('express-ejs-layouts');

const app = express();

const port = 3000|| process.env.PORT;

app.set('views', path.join(__dirname, '../frontend/public/src/views'));
app.set('view engine', 'ejs');
app.set('layout', 'layout');
app.use(expressLayouts);

// Middleware para procesar datos del formulario
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../frontend/public')));

app.listen(port, () => {        
    console.log(`Server is running on http://localhost:${port}`);
});

app.use(morganMiddleware);

app.use('/', router);