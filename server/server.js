require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mountRoutes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

mountRoutes(app);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
