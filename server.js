const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const sequelize = require('./database/connection');
const path = require('path');
const session = require('express-session');
const sessionClient = require('./middlewares/middlewarerSession');
const supplierRoutes = require('./routes/suppliersRoutes');
const clientRoutes = require('./routes/clientRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.use(session({
  secret: 'segredo-sessao',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: 'strict'
  }
}));

//MIDDLEWARE SESSION
app.use(sessionClient);

//ROUTES
app.use('/',authRoutes);
app.use('/',clientRoutes);
app.use('/',orderRoutes);
app.use('/',supplierRoutes);
app.use('/',productRoutes);

app.use('/', (req, res) => res.status(404).json({message: 'Esta rota não existe'}));

sequelize
  .sync()
  // .sync({force:true})
  .then(() => {
    app.listen(3001, () => console.log('Servidor rodando em http://localhost:3001'));

  })
  .catch((error) => {
    console.log('ERRO:' + error);
  })


