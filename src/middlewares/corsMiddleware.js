const cors = require("cors");

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  allowedHeaders: "Content-Type, Authorization",
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;