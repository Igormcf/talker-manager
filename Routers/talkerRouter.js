const express = require('express');

const router = express.Router();

const { readTalker } = require('../functions-fs');

router.get('/', async (_req, res) => {
  const result = await readTalker();

  if (result.length === 0) {
    return res.status(200).send([]);
  }

  return res.status(200).json(result);
});

module.exports = router;