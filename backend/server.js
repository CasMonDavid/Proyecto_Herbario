const express = require("express");
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

//local: http://localhost:3000
//railway: https://proyectoherbario-production.up.railway.app

const corsOption = {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}
app.use(cors(corsOption));
app.use(express.json());

app.use('/fotos', express.static(path.join(__dirname, 'fotos')));

const routes = require("./routes");
app.use(routes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });