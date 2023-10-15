const readAndwriteFiles = require('./readAndWriteFiles');

const idValidation = async (req, res, next) => {
  const { id } = req.params;
  const talkers = await readAndwriteFiles.readTalker();

  const matchId = talkers.find((talker) => talker.id === Number(id));

  if (!matchId) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  next();
};

module.exports = idValidation;