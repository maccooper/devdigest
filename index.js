const express = require('express');
const app = express();

const digestRoute = require('./routes/digest'); //Customer router

const PORT = process.env.PORT || 3000;

app.use('/api/digest', digestRoute); //Mounts digest router

app.listen(process.env.PORT || 3000);

