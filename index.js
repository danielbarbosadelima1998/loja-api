const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config();

const app = express();
const routes = require('./src/routes');

require('./src/database');

app.use(cors());
app.use(bodyParser.json());
app.use(routes);

app.listen(process.env.PORT, () => console.log(`Servidor rodando em http://localhost:${process.env.PORT}`));
