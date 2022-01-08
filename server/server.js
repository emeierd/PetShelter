require("dotenv").config();

const express = require("express")
const app = express();

require("./config/mongoConnect")();

const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
// Change the app.use(cors()) to the one below
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(express.json())

app.use('/api', require('./routes/api'))

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));