const express = require('express');
const path = require('path');
const CORS = require('cors');
const imageRouter = require('./router');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, '../build')));

app.use(CORS());
app.use('/api', imageRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});