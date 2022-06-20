module.exports = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;

  const dataGex = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;

  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }

  if (!dataGex.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};