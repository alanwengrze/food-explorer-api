require("express-async-errors");
require("dotenv/config");
const express = require('express');
const AppError = require('./utils/AppError');
const cors = require('cors');

const uploadConfigs = require("./configs/upload");

const app = express();

const routes = require('./routes');

app.use(express.json());
app.use(cors());

app.use(routes);

app.use("/files", express.static(uploadConfigs.UPLOADS_FOLDER));

app.use((error, request, response, next) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }
  console.log(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  })
})


const PORT = process.env.PORT || 3333;

app.listen( PORT, ()=> console.log("Server is running on port", PORT) );