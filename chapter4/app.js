const express = require("express");
const app = express();
const port = 8000;

const morgan = require('morgan');
app.use(morgan('dev'));
app.use(express.json());

const router = require('./route');
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

app.listen(port, () => console.log(`running on port ${port}`, port));