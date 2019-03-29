
require('dotenv').config()
const express = require('express');
const helmet = require('helmet');

// const db = require('./data/dbConfig.js');

const actionRouter = require('./action-router.js');
const projectRouter = require('./project-router.js');

const server = express();
server.use(helmet());
server.use(express.json());

server.use('/api/action', actionRouter);
server.use('/api/project', projectRouter);

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`LISTEN ... ${port}`);
});
