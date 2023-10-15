const watchedValidation = (req, res, next) => {
  const { talk } = req.body;
  const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
  const dateIsValid = datePattern.test(talk.watchedAt);
  
  if (!talk.watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!dateIsValid) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  
  next();
};
  
module.exports = watchedValidation;