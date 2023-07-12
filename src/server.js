require('express-async-errors');
require('dotenv/config');

const express = require('express');
const cors = require('cors');

const sqliteConnection = require('./database/sqliteConnection');
const routes = require('./routes');
const AppError = require('./utils/AppError');
const uploadsConfig = require('./configs/upload');

sqliteConnection();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/files", express.static(uploadsConfig.UPLOADS_FOLDER));

app.use(routes)

app.use(( error, request, response, next ) => {
  if(error instanceof AppError) {
    return response.status(error.statuCode).json({
      status: "Error",
      message: error.message
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "Error",
    message: "Internal server error"
  });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server is runing on Port ${PORT}`));