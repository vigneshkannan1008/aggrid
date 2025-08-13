const express = require('express');
const cors = require('cors');
const aggridRouter = require('./routers/aggridRouter');
const connectDB = require('./connectDB');

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use('/', aggridRouter);

const port = 1000;

app.listen(port, () => {
    console.log(`server is running on the port ${port}`);
})