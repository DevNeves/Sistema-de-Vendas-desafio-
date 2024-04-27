const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
const PORT = process.env.PORT || 3006;

dotenv.config();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const DistrictsController = require('./Districts/DistrictsController');
const CitiesController = require('./City/CitiesController');
const PeoplesController = require('./Peoples/PeoplesController');
const ProductsController = require('./Products/ProductsController');
const SaleProducts = require('./Sale/SaleProducts');

app.use('/', DistrictsController);
app.use('/', CitiesController);
app.use('/', PeoplesController);
app.use('/', ProductsController);
app.use('/', SaleProducts);

app.listen(PORT, (err) => {
  if (err) throw err;
});
