const express = require('express');
const morgan = require('morgan');
const router = require('./route');
const cors = require('cors');
const app = express();
const port = 7000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use(router);


app.use((req, res, next) => {
    return res.status(404).json({
      message: `cant find ${req.url}`,
    });
    next();
  }); // 404 error handling middleware
  
  app.use((err, req, res, next) => {
    return res.status(500).json({
      message: err.message,
    });
  }); // error handling middleware

app.listen(port, () => console.log(`running on port ${port}`));