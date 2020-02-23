const express = require('express');
const Sentiment = require('sentiment');
const db = require('../../../db');

const sentiment = new Sentiment();

const router = express.Router();

router.get('/', async (req, res) => {
  const sql = 'SELECT * FROM puns ORDER BY posted DESC';
  const puns = await db.query(sql);
  res.send({ puns });
});

router.post('/', async (req, res) => {
  const { text } = req.body;
  const sql = `
    INSERT INTO puns (text, sentiment)
      VALUES ($1, $2)
      RETURNING *
  `;
  const values = [text, sentiment.analyze(text).comparative];
  const [pun] = await db.query(sql, values);
  res.send({ pun });
});

router.post('/:id/downvote', async (req, res) => {
  const sql = `
    UPDATE puns
      SET downvotes = downvotes + 1
      WHERE id = $1
      RETURNING *
  `;
  const values = [req.params.id];
  const [pun] = await db.query(sql, values);
  res.send({ pun });
});

module.exports = router;
