const express = require("express");
// const db = require('./src/config/db.js');
// const bodyParser = require('body-parser');
const corsMiddleware = require("./src/middlewares/corsMiddleware.js");
const vehiclemasterRoute = require("./src/routes/vehiclemasterRoute.js");
const wfeventtrnRoute = require("./src/routes/wfeventtrnRoute.js");
const drivermasterRoute = require("./src/routes/drivermasterRoute.js");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// Use the custom CORS middleware
app.use(corsMiddleware);

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.json());

app.use("/api/v1/", vehiclemasterRoute);
app.use("/api/v1/", wfeventtrnRoute);
app.use("/api/v1/", drivermasterRoute);

app.get("/", (req, res) => {
  res.send("Application is started");
});

// // Check if the database connection is established
// db.getConnection((err, connection) => {
//     if (err) {
//         console.error('Error connecting to the database:', err);
//     } else {
//         console.log('Connected to the database');
//         connection.release();
//     }
// });

app.listen(PORT, () => {
  console.log(`Application listening on port ${PORT}`);
});
