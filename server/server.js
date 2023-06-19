require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mountRoutes = require('./api');

/** 
 * *
 * CityKeep Server
 * @description 
    - This file sets up the server (Express app) and mounts the 
      API routes.
    - This is the grunt workhorse of the crush. (??? Docify AI said it not me)
 * @listens server.js
 */

const app = express();

app.use(cors());
app.use(express.json());

mountRoutes(app);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
