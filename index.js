
require('dotenv').config()
const express = require('express');
const helmet = require('helmet');

// const db = require('./data/dbConfig.js');

const actionRouter = require('./data/helpers/action-router.js');
const projectRouter = require('./data/helpers/project-router.js');

const server = express();
server.use(helmet());
server.use(express.json());

server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`LISTEN ... ${port}`);
});
