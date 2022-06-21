const express = require('express');

const router = express.Router();

const { readTalker, writeTalker } = require('../functions-fs');

const authorization = require('../Middlewares/authorization');

const {
  validaName,
  validaAge,
  validaTalk,
  validaWatchedAt,
  validaRate,
} = require('../Middlewares/index');

router.get('/search', authorization, async (req, res) => {
  const { q } = req.query;
  const result = await readTalker();
  const filterTalker = result.filter((item) => item.name.includes(q));

  if (!q) {
    return res.status(200).json(result);
  }

  if (!filterTalker) {
    return res.status(200).send([]);
  }

  return res.status(200).json(filterTalker);
});

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

router.post('/',
  authorization,
  validaName,
  validaAge,
  validaTalk,
  validaWatchedAt,
  validaRate,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const result = await readTalker();
    const id = result.length + 1;
    result.push({ id, name, age, talk });
    await writeTalker(result);
    res.status(201).json({ id, name, age, talk });
});

router.put('/:id',
  authorization,
  validaName,
  validaAge,
  validaTalk,
  validaWatchedAt,
  validaRate,
  async (req, res) => {
    const id = Number(req.params.id);
    const { name, age, talk } = req.body;
    const result = await readTalker();

    const findIxResult = result.findIndex((item) => item.id === id);

    result[findIxResult] = { ...result[findIxResult], name, age, talk };

    await writeTalker(result);

    return res.status(200).json({ id, name, age, talk });
});

router.delete('/:id', authorization, async (req, res) => {
  const { id } = req.params;
  const result = await readTalker();

  const filterTalker = result.filter((item) => item.id !== Number(id));

  writeTalker(filterTalker);

  return res.status(204).end();
});

module.exports = router;