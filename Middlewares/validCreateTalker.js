const validNameTalker = (name, res) => {
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
};

const validAgeTalker = (age, res) => {
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (Number(age) < 18) {
    return res
      .status(400)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
};

const validTalkWatchedAt = (talk, res) => {
  const { watchedAt } = talk;
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  const validDate = regex.test(watchedAt);
  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!validDate) {
    return res
      .status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
};

const validTalkRate = (talk, res) => {
  const { rate } = talk;
  if (rate === undefined) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (Number(rate) < 1 || Number(rate) > 5) {
    return res
      .status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
};

const validCreateTalker = async (req, res, next) => {
  const { name, age, talk } = req.body;
  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  validNameTalker(name, res);
  validAgeTalker(age, res);
  validTalkRate(talk, res);
  validTalkWatchedAt(talk, res);
  next();
};

module.exports = {
  validCreateTalker,
};
