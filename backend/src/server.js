const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
require('dotenv').config();
const forgotPasswordRoute = require('./routes/forgotPasswordRoute');

app.use(cors());
app.use(morgan('combined'));
app.use(helmet());
app.use(express.json());


app.get('/', (req, res) => {
    res.json({
        message: `You've reached the forgot password index page!`
    });
});


const port = process.env.PORT || 4444;
app.listen(port, () => console.log(`Listening on ${port}`));

app.use('/api', forgotPasswordRoute);