const express = require('express');
const puns = require('./puns');

const router = express.Router();

router.use(express.json());

router.use('/puns', puns);

module.exports = router;
