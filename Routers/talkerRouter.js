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

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const result = await readTalker();
  const findTalker = result.find((item) => item.id === Number(id));

  if (!findTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(200).json(findTalker);
});

module.exports = router;